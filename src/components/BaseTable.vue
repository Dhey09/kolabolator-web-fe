<template>
  <a-table
    :columns="computedColumns"
    :data-source="dataSource"
    :row-key="rowKey"
    :pagination="pagination"
    :scroll="scroll"
    bordered
    table-layout="auto"
  >
    <template #bodyCell="{ column, record, index }">
      <!-- Kolom No -->
      <template v-if="column.key === 'no'">
        {{ index + 1 }}
      </template>
      <template v-if="column.key === 'price'">
        {{ formatRupiah(record.price) }}
      </template>

      <template v-else-if="column.key === 'script'">
        <a-button
          size="small"
          type="primary"
          @click="
            downloadFile(record.script, record.collaborator_name, 'naskah')
          "
        >
          <a-space> <DownloadOutlined /> Naskah </a-space>
        </a-button>
      </template>
      <template v-else-if="column.key === 'haki'">
        <a-button
          size="small"
          type="primary"
          @click="downloadFile(record.haki, record.collaborator_name, 'haki')"
        >
          <a-space> <DownloadOutlined /> Haki </a-space>
        </a-button>
      </template>
      <template v-else-if="column.key === 'identity'">
        <a-button
          size="small"
          type="primary"
          @click="
            downloadFile(record.identity, record.collaborator_name, 'ktp')
          "
        >
          <a-space> <DownloadOutlined /> KTP </a-space>
        </a-button>
      </template>

      <!-- Kolom Image -->
      <template v-else-if="column.key === 'img'">
        <a-image
          v-if="record.img"
          :src="record.img"
          alt="preview"
          :width="60"
          :height="60"
          style="object-fit: cover; border-radius: 6px"
        />
        <span v-else
          ><a-image
            :src="defaultBook"
            alt="preview"
            :width="60"
            :height="60"
            style="object-fit: cover; border-radius: 6px"
        /></span>
      </template>

      <template v-else-if="column.key === 'payment_proof'">
        <a-image
          v-if="record.payment_proof"
          :src="record.payment_proof"
          alt="preview"
          :width="60"
          :height="60"
          style="object-fit: cover; border-radius: 6px"
          @click="
            downloadFile(
              record.payment_proof,
              record.checkout_by_name,
              'Bukti_pembayaran'
            )
          "
        />
        <span v-else
          ><a-image
            :src="defaultBook"
            alt="preview"
            :width="60"
            :height="60"
            style="object-fit: cover; border-radius: 6px"
        /></span>
      </template>
      <template v-else-if="column.key === 'chapter_payment_proof'">
        <a-image
          v-if="record.chapter_payment_proof"
          :src="record.chapter_payment_proof"
          alt="preview"
          :width="60"
          :height="60"
          style="object-fit: cover; border-radius: 6px"
        />
      </template>

      <template v-else-if="column.key === 'status'">
        <div class="flex flex-col items-center justify-center">
          <a-tag
            style="
              display: inline-flex;
              align-items: center;
              gap: 24px;
              margin-bottom: 5px;
            "
            :color="
              record.status === 'pending' || record.status === 'need_complete'
                ? 'orange'
                : record.status === 'waiting' ||
                  record.status === 'need_update' ||
                  record.status === 'draft' ||
                  record.status === 'editing' ||
                  record.status === 'isbn_submission' ||
                  record.status === 'published' ||
                  record.status === 'printed'
                ? 'blue'
                : record.status === 'close' || record.status === 'completed'
                ? 'green'
                : 'gray'
            "
          >
            <template v-if="record.status === 'pending'">
              <div class="flex m-2">
                <ClockCircleOutlined />
              </div>
            </template>
            <template v-else-if="record.status === 'waiting'">
              <div class="flex m-2">
                <HourglassOutlined />
              </div>
            </template>
            <template
              v-else-if="
                record.status === 'close' || record.status === 'completed'
              "
            >
              <div class="flex m-2">
                <CheckCircleOutlined />
              </div>
            </template>
            <template
              v-else-if="
                record.status === 'need_update' ||
                record.status === 'need_complete'
              "
            >
              <div class="flex m-2">
                <FormOutlined />
              </div>
            </template>
            <template v-else>
              {{ record.status }}
            </template>
          </a-tag>
          <template
            v-if="
              record.status === 'waiting' ||
              record.status === 'need_update' ||
              record.status === 'draft' ||
              record.status === 'editing' ||
              record.status === 'isbn_submission' ||
              record.status === 'published' ||
              record.status === 'printed'
            "
          >
            <a-button
              size="small"
              v-if="onUpdateStatus"
              type="primary"
              @click="onUpdateStatus(record)"
            >
              Update Status
            </a-button>
          </template>
        </div>
      </template>

      <!-- Kolom Actions -->
      <template v-else-if="isAction && column.key === 'actions'">
        <a-space>
          <a-button
            size="small"
            v-if="onView"
            type="link"
            @click="onView(record)"
          >
            <EyeOutlined />
          </a-button>
          <a-button
            size="small"
            v-if="onEdit"
            type="link"
            @click="onEdit(record)"
          >
            <EditOutlined />
          </a-button>
          <a-popconfirm
            v-if="onDelete"
            title="Yakin hapus data ini?"
            ok-text="Ya"
            cancel-text="Batal"
            @confirm="() => onDelete(record)"
          >
            <a-button size="small" type="link" danger>
              <DeleteOutlined />
            </a-button>
          </a-popconfirm>

          <a-button
            size="small"
            v-if="onReject"
            type="primary"
            danger
            ghost
            @click="onReject(record)"
          >
            Reject
          </a-button>
          <a-popconfirm
            v-if="onApprove"
            title="Yakin Approve?"
            ok-text="Ya"
            cancel-text="Batal"
            @confirm="() => onApprove(record)"
          >
            <a-button size="small" type="primary" success> Approve </a-button>
          </a-popconfirm>

          <a-button
            size="small"
            v-if="onComplete && record.status === 'need_complete'"
            type="primary"
            @click="onComplete(record)"
          >
            Lengkapi
          </a-button>

          <!-- <a-button
            size="small"
            v-if="
              onView &&
              (record.status === 'pending' || record.status === 'completed')
            "
            type="primary"
            @click="onView(record)"
          >
            Lihat Detail
          </a-button> -->

          <a-button
            size="small"
            v-if="onUpdateDocument && record.status === 'need_update'"
            type="primary"
            @click="onUpdateDocument(record)"
          >
            Perbaiki Dokumen
          </a-button>
        </a-space>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { computed } from "vue";

const defaultBook = new URL("@/assets/img/default_img.jpeg", import.meta.url)
  .href;

const props = defineProps({
  columns: { type: Array, required: true },
  dataSource: { type: Array, required: true },
  rowKey: { type: String, default: "id" },
  scroll: {
    type: [Object, Boolean],
    default: () => ({ x: "max-content" }),
  },
  pagination: { type: [Object, Boolean], default: () => ({ pageSize: 5 }) },
  isAction: { type: [Function, Boolean], default: false },
  onView: Function,
  onEdit: Function,
  onDelete: Function,
  onComplete: Function,
  onApprove: Function,
  onReject: Function,
  onUpdateStatus: Function,
  onUpdateDocument: Function
});

const formatRupiah = (value) => {
  if (value == null || value === "") return "-";

  const formatted = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
  }).format(value);

  return `Rp. ${formatted}`;
};

const downloadFile = async (url, userName, type) => {
  try {
    const response = await fetch(url, { mode: "cors" }); // ambil file
    if (!response.ok) throw new Error("Failed to download file");

    const blob = await response.blob(); // konversi ke blob
    const ext = url.split(".").pop(); // ambil ekstensi file
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = `${userName}_${type}.${ext}`; // nama file: Super Admin_naskah.pdf
    a.click();
    window.URL.revokeObjectURL(a.href);
  } catch (err) {
    console.error(err);
    alert("Download gagal, coba lagi");
  }
};

const computedColumns = computed(() => {
  // Kolom No (fixed left)
  let cols = [
    {
      title: "No",
      key: "no",
      width: 80,
      fixed: "left",
      align: "center",
    },
    ...props.columns.map((col) => ({
      ...col,
      elipsis: true,
    })),
  ];

  // Kolom Actions (fixed right)
  if (
    props.isAction &&
    (props.onView ||
      props.onEdit ||
      props.onDelete ||
      props.onApprove ||
      props.onReject ||
      props.onComplete ||
      props.onUpdateStatus)
  ) {
    cols.push({
      title: "Actions",
      key: "actions",
      fixed: "right",
      align: "center",
    });
  }

  return cols;
});
</script>

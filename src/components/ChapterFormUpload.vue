<template>
  <a-card>
    <div class="mb-4" v-if="title">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
    </div>

    <a-form
      :model="localModel"
      :rules="rules"
      layout="vertical"
      @finish="handleSubmit"
    >
      <template v-for="field in fields" :key="field.name">
        <!-- Input teks -->
        <a-form-item
          v-if="field.type === 'input' || field.type === 'number'"
          :label="field.label"
          :name="field.name"
        >
          <a-input
            v-model:value="localModel[field.name]"
            :placeholder="field.placeholder || 'Pilih salah satu'"
            @keypress="field.type === 'number' ? allowOnlyNumber($event) : null"
            @input="field.type === 'number' ? filterNumber(field.name) : null"
          />
        </a-form-item>

        <a-form-item
          v-if="field.type === 'textarea'"
          :label="field.label"
          :name="field.name"
        >
          <a-textarea
            v-model:value="localModel[field.name]"
            :placeholder="field.placeholder || 'Pilih salah satu'"
          />
        </a-form-item>

        <a-form-item
          v-if="field.type === 'select'"
          :label="field.label"
          :name="field.name"
          :rules="rules[field.name]"
        >
          <a-select
            v-model:value="localModel[field.name]"
            :options="field.options"
            :placeholder="field.placeholder"
            :field-names="{ label: 'label', value: 'value' }"
            allowClear
            show-search
            :filter-option="
              (input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
            "
          />
        </a-form-item>

        <!-- Upload gambar -->
        <a-form-item
          v-if="field.type === 'upload'"
          :label="field.label"
          :name="field.name"
          :placeholder="field.placeholder || 'Pilih salah satu'"
        >
          <a-upload
            :before-upload="(file) => beforeUpload(field.name, file)"
            :file-list="fileList[field.name]"
            list-type="picture"
            :max-count="1"
            :on-remove="(file) => handleRemove(field.name, file)"
          >
            <a-button>Upload</a-button>
          </a-upload>
        </a-form-item>
      </template>

      <a-form-item>
        <div class="flex justify-end">
          <a-space>
            <a-button @click="handleCancel">Batal</a-button>
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-space>
        </div>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  name: "BaseForm",
  props: {
    title: { type: String, default: "" },
    fields: { type: Array, required: true },
    modelValue: { type: Object, default: () => ({}) },
    rules: { type: Object, default: () => ({}) },
    submitAction: { type: String, required: true },
    cancel: { type: Function, required: true },
  },
  data() {
    return {
      localModel: { ...this.modelValue },
      fileList: {},
    };
  },
  mounted() {
    this.fields.forEach((field) => {
      if (
        field.type === "upload" &&
        this.localModel[field.name] &&
        typeof this.localModel[field.name] === "string"
      ) {
        this.fileList[field.name] = [
          {
            uid: "-1",
            name: this.localModel[field.name],
            status: "done",
            url: this.localModel[field.name],
          },
        ];
      }
    });
  },
  methods: {
    allowOnlyNumber(e) {
      const char = String.fromCharCode(e.charCode);
      if (!/[0-9]/.test(char)) {
        e.preventDefault();
      }
    },
    filterNumber(fieldName) {
      if (this.localModel[fieldName]) {
        this.localModel[fieldName] = this.localModel[fieldName].replace(
          /\D/g,
          ""
        );
      }
    },
    beforeUpload(field, file) {
      this.localModel[field] = file;
      this.fileList[field] = [file];
      return false;
    },
    handleRemove(field, file) {
      this.fileList[field] = [];
      this.localModel[field] = null;
    },
    async handleSubmit() {
      try {
        await this.$store.dispatch(this.submitAction, this.localModel);
      } catch (error) {
      } finally {
        this.$router.push("/chapter");
      }
    },
    handleCancel() {
      this.cancel();
    },
  },
  watch: {
    modelValue: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.localModel = { ...newVal };
        this.fileList = {};
        this.fields.forEach((field) => {
          if (
            field.type === "upload" &&
            this.localModel[field.name] &&
            typeof this.localModel[field.name] === "string"
          ) {
            this.fileList[field.name] = [
              {
                uid: "-1",
                name: this.localModel[field.name],
                status: "done",
                url: this.localModel[field.name],
              },
            ];
          }
        });
      },
    },
  },
};
</script>

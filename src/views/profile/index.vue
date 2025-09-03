<template>
  <div class="w-full h-full flex items-center justify-center bg-gray-100 py-6 px-4">
    <div class="flex w-full flex-col w-full justify-center items-center">
      <div class="w-full">
        <a-card>
          <div class="w-full p-2">
            <div class="font-bold text-4xl">PROFIL PENGGUNA</div>
            <hr
              class="flex w-full border-4 border-blue-900 border-dashed my-2"
            />
          </div>
          <div class="flex w-full p-6">
            <!-- KIRI: Profile -->
            <div
              class="flex w-1/2 mr-4 flex-col justify-center items-center bg-gray-100 border-4 border-blue-900 rounded-2xl shadow-lg"
            >
              <div class="font-bold text-gray-800 text-2xl mb-2">
                Profil Pengguna
              </div>
              <a-image
                :src="`${userDetail?.img}`||'https://i.ibb.co/4pDNDk1/avatar.png'"
                alt="Profile"
                class="w-10 h-10 rounded-full border-4 border-blue-900 shadow-md p-6"
              />
              <div class="mt-4 text-xl font-bold text-gray-800">
                {{ userDetail?.name }}
              </div>
              <p class="text-green-600 font-medium capitalize">
                {{ userDetail?.role_name }}
              </p>
            </div>

            <!-- KANAN: Bio -->
            <div
              class="flex flex-col w-full text-gray-700 bg-gray-100 border-4 border-blue-900 rounded-2xl shadow-lg p-6"
            >
              <div class="flex w-full justify-between px-4">
                <div class="flex flex-col w-1/2 mr-4">
                  <div class="">Username</div>
                  <div class="flex text-lg font-bold">
                    {{ userDetail?.username }}
                  </div>
                </div>
                <div class="flex flex-col w-1/2">
                  <div class="">Email</div>
                  <div class="flex text-lg font-bold">
                    {{ userDetail?.email }}
                  </div>
                </div>
              </div>
              <hr class="flex w-full border-1 border-blue-900/50 my-2" />

              <div class="flex w-full justify-between px-4">
                <div class="flex flex-col w-1/2 mr-4">
                  <div class="">Nomor Telephone</div>
                  <div class="flex text-lg font-bold">
                    {{ userDetail?.phone }}
                  </div>
                </div>
                <div class="flex flex-col w-1/2">
                  <div class="">Gelar</div>
                  <div class="flex text-lg font-bold">
                    {{ userDetail?.gelar }}
                  </div>
                </div>
              </div>
              <hr class="flex w-full border-1 border-blue-900/50 my-2" />

              <div class="flex w-full justify-between px-4">
                <div class="flex flex-col w-1/2 mr-4">
                  <div class="">Pendidikan Akhir</div>
                  <div class="flex text-lg font-bold">
                    {{ userDetail?.pendidikan_akhir }}
                  </div>
                </div>
                <div class="flex flex-col w-1/2">
                  <div class="">Tempat Lahir</div>
                  <div class="flex text-lg font-bold">
                    {{ userDetail?.tmpt_lahir }}
                  </div>
                </div>
              </div>
              <hr class="flex w-full border-1 border-blue-900/50 my-2" />

              <div class="flex w-full justify-between px-4">
                <div class="flex flex-col w-1/2 mr-4">
                  <div class="">Tanggal Lahir</div>
                  <div class="flex text-lg font-bold">
                    {{ formatDate(userDetail?.tgl_lahir) }}
                  </div>
                </div>
                <div class="flex flex-col w-1/2">
                  <div class="">Agama</div>
                  <div class="flex text-lg font-bold">
                    {{ userDetail?.agama }}
                  </div>
                </div>
              </div>
              <hr class="flex w-full border-1 border-blue-900/50 my-2" />

              <div class="flex w-full justify-between px-4">
                <div class="flex flex-col w-1/2 mr-4">
                  <div class="">Pekerjaan</div>
                  <div class="flex text-lg font-bold">
                    {{ userDetail?.pekerjaan }}
                  </div>
                </div>
                <div class="flex flex-col w-1/2">
                  <div class="">Alamat</div>
                  <div class="flex text-lg font-bold">
                    {{ userDetail?.alamat }}
                  </div>
                </div>
              </div>
              <hr class="flex w-full border-1 border-blue-900/50 my-2" />

              <div class="flex justify-end pt-2">
                <a-space></a-space>
                <a-button type="primary" @click="updateProfile">
                  Edit Profile
                </a-button>
              </div>
            </div>
          </div>
          <hr class="flex w-full border-4 border-blue-900 border-dashed my-2" />
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const userDetail = computed(() => store.state.user.userDetail);
const userId = localStorage.getItem("userId");

const formatDate = (date) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};
const updateProfile = () => {
  router.push("/profile-update");
};
onMounted(async () => {
  // misalnya id user aktif diambil dari localStorage
  await store.dispatch("user/fetchUserById", userId);
});
</script>

<style></style>

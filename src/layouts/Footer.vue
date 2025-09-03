<script setup lang="ts">
import { InstagramOutlined, PhoneFilled } from "@ant-design/icons-vue";
</script>

<template>
  <div class="flex justify-between bg-primary-dark p-16 text-white">
    <div class="w-1/3">
      <div class="flex items-center mb-2">
        <img src="@/assets/svg/logo.svg" alt="Logo" class="w-8 h-8 mr-2" />
        <div class="text-xl font-bold">Profil Penerbit</div>
      </div>
      <p class="text-justify">
        CV Widina Media Utama merupakan lembaga Penerbit Buku Profesional dan
        Legal, sebuah entitas yang berdedikasi untuk menghadirkan buku-buku
        berkualitas tinggi kepada masyarakat dengan mematuhi segala aspek hukum
        yang berlaku. Kami adalah rumah bagi kreativitas dan intelektualitas,
        berkomitmen untuk mendukung penulis dan intelektual dalam menerbitkan
        karya-karya mereka dengan cara yang etis dan sah. Misi kami adalah
        menyebarkan pengetahuan, informasi, dan karya seni yang bernilai kepada
        pembaca. Kami menjalankan proses penerbitan yang ketat, termasuk proses
        penyuntingan, proofreading, dan desain buku yang profesional, untuk
        memastikan setiap buku yang kami terbitkan memenuhi standar kualitas
        yang tinggi.
      </p>
    </div>

    <div class="w-1/3 mx-16">
      <div class="flex items-center mb-2">
        <div class="text-xl font-bold">Hubungi Kami</div>
      </div>
      <p class="text-justify">
        <span class="font-bold">Alamat Redaksi:</span><br />
        Komp. Puri Melia Asri Blok C 3 No. 17 Jalan Raya Sapan-Gede Bage Desa
        Bojong Emas Kec. Solokan Jeruk Kabupaten Bandung Prov Jawa Barat.
      </p>
      <p class="text-justify">
        <span class="font-bold">Kunjungan Tamu:</span><br />
        Jl. Parakansaat 3 No. 137 Kel. Cisaranten Endah Kec. Arcamanik Kota
        Bandung Povinsi Jawa Barat, Indonesia. (Jl. Sokarno Hatta, Samping Dinas
        Kehutanan Provinsi Jawa Barat)
      </p>
    </div>

    <div class="w-1/3 justify-center items-center flex-1 pl-16">
      <div class="flex items-center mb-2">
        <div class="text-xl font-bold">Kontak Kami</div>
      </div>
      <div class="flex flex-col w-full">
        <div class="flex justify-center">
          <div class="items-center ml-2 mb-4 mr-4 flex">
            <PhoneFilled class="text-3xl" />
          </div>
          <p class="text-justify">
            CS 1 0815-7000-699<br />CS 2 0838-9755-4749<br />CS 3
            0877-3726-2899<br />Office: 022-873553
          </p>
        </div>
        <div class="flex items-center mb-2">
          <div class="text-xl font-bold">Social Media</div>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col justify-center items-center">
            <FacebookOutlined class="text-3xl pb-2" />
            <span>Penerbit Widina</span>
          </div>
          <div class="flex flex-col justify-center items-center">
            <InstagramOutlined class="text-3xl pb-2" />
            <span>Penerbit Widina</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

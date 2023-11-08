<template>
  <div class="font-sans text-center text-gray-700">
    <nav class="p-4">
      <router-link
        to="/"
        class="flex items-center justify-center font-semibold text-gray-700 hover:text-green-600 h-32"
      >
        <a href="https://karimbaidar.github.io/" target="_blank" class="text-flight uppercase">Karim Baidar Github Portfolio</a>
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

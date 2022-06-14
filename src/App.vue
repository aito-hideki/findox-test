<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <q-page class="q-px-lg q-py-xl">
        <DocumentsViewer :deals="deals" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { deals } from '@/consts/deals'
</script>

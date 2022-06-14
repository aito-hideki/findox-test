<template>
  <q-btn
    class="documents-viewer-filter"
    :icon="selected.length ? 'mdi-filter' : 'mdi-filter-outline'"
    flat
    round
    size="xs"
    @click.stop
  >
    <q-menu
      class="documents-viewer-filter__menu"
      self="top middle"
      max-height="none"
    >
      <q-card>
        <q-card-section>
          <div class="text-body1 text-bold text-center q-mb-md">
            {{ title }}
          </div>

          <q-input
            v-model="filter"
            class="q-mb-sm"
            :placeholder="'Filter ' + title"
            outlined
            dense
          />
          <template
            v-for="candidate in filteredIndustries"
            :key="candidate"
          >
            <q-checkbox
              v-model="selectedFields"
              class="q-mb-xs"
              :val="candidate"
              :label="candidate"
              size="xs"
            />
            <br>
          </template>
          <q-separator class="q-my-sm" />
          <div class="flex justify-between">
            <q-btn
              label="Clear Filter"
              color="warning"
              unelevated
              no-caps
              size="sm"
              @click="selectedFields = []"
            />
            <q-btn
              v-close-popup
              label="Close"
              unelevated
              outline
              no-caps
              size="sm"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits<
  (event: 'update:selected', value: string[]) => void
>()
const props = defineProps<{
  title: string,
  field: string,
  selected: string[],
  deals: any[]
}>()

const candidates = computed(() => Array.from(new Set(
  props.deals.map((deal) => deal[props.field]).filter(t => t)
)) as string[])

const filter = ref('')
const filteredIndustries = computed(() => candidates.value.filter(
  (candidate) => candidate.toLowerCase().includes(filter.value.toLowerCase())
))

const selectedFields = computed({
  get: () => props.selected,
  set: (value: string[]) => {
    emit('update:selected', value)
  }
})
</script>

<style lang="scss">
.documents-viewer-filter__menu {
  width: 300px;
}
</style>

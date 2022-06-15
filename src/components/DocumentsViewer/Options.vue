<template>
  <q-btn
    class="documents-viewer-options"
    color="primary"
    label="Options"
    unelevated
    @click.stop
  >
    <q-menu
      class="documents-viewer-options__menu"
      self="top middle"
      max-height="none"
    >
      <q-card>
        <q-card-section>
          <template
            v-for="field in fields"
            :key="field"
          >
            <q-checkbox
              v-model="visibleFields"
              class="q-mb-xs"
              :val="field.value"
              :label="field.label"
              size="xs"
            />
            <q-separator class="q-my-xs" />
          </template>
          <div class="flex justify-between q-mt-sm">
            <q-btn
              v-close-popup
              label="Save"
              color="primary"
              unelevated
              no-caps
              @click="save"
            />
            <q-btn
              v-close-popup
              label="Cancel"
              color="primary"
              unelevated
              no-caps
              @click="cancel"
            />
            <q-btn
              v-close-popup
              label="Reset"
              color="primary"
              unelevated
              no-caps
              @click="reset"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Field {
  label: string,
  value: string
}

export default defineComponent({
  props: {
    visible: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array as PropType<Field[]>,
      default: () => []
    }
  },
  emits: ['update:visible'],
  data: () => ({
    visibleFields: [] as string[]
  }),
  watch: {
    visible: {
      handler: 'feedData',
      immediate: true
    }
  },
  methods: {
    feedData () {
      this.visibleFields = [...this.visible as string[]]
    },
    save () {
      this.$emit('update:visible', [...this.visibleFields])
    },
    cancel () {
      this.visibleFields = [...this.visible as string[]]
    },
    reset () {
      this.$emit('update:visible', [...this.fields.map(({ value }: any) => value)])
    }
  }
})
</script>

<!-- <script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  (event: 'update:visible', value: string[]): void
}>()
const props = defineProps<{
  visible: string[]
  fields: { label: string, value: string }[]
}>()

const visibleFields = ref([] as string[])

// Excute operations including save, cancel, reset
// only when those buttons are clicked

const save = () => {
  emit('update:visible', [...visibleFields.value])
}

const cancel = () => {
  visibleFields.value = [...props.visible]
}

const reset = () => {
  emit('update:visible', [...props.fields.map(({ value }) => value)])
}

// Always synchronize internal value with prop
watch(() => props.visible, () => {
  visibleFields.value = [...props.visible]
}, { immediate: true })
</script> -->

<style lang="scss">
.documents-viewer-options__menu {
  width: 300px;
}
</style>

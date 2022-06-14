<template>
  <q-table
    class="documents-viewer shadow-0"
    :rows="filteredDeals"
    :columns="DocumentViewerHeader"
    :pagination="pagination"
    row-key="id"
    hide-bottom
  >
    <template #top>
      <q-input
        v-model="search"
        class="documents-viewer__search"
        placeholder="Search for deals"
        outlined
        dense
      />
      <DocumentsViewerOptions
        v-model:visible="visibleFields"
        class="q-ml-md"
        :fields="DocumentFields"
      />
    </template>
    <template #header-cell="cellProps">
      <q-th :props="cellProps">
        {{ cellProps.col.label }}

        <DocumentsViewerFilter
          v-model:selected="filters[cellProps.col.field]"
          :title="cellProps.col.label"
          :field="cellProps.col.field"
          :deals="deals"
        />
      </q-th>
    </template>
    <template #top-row>
      <tr class="documents-viewer__count">
        <td
          class="q-px-md q-py-sm bg-tertiary"
          :colspan="DocumentViewerHeader.length"
        >
          Showing <strong>
            {{ filteredDeals.length }}
          </strong> <span>
            {{ pluralize('deal', filteredDeals.length) }}
          </span>.
        </td>
      </tr>
    </template>
    <template #body="bodyProps">
      <q-tr :props="bodyProps">
        <q-td
          v-for="col in bodyProps.cols"
          :key="col.name"
          class="cursor-pointer"
          :props="bodyProps"
          @click="bodyProps.expand = !bodyProps.expand"
        >
          {{ col.value }}
        </q-td>
      </q-tr>
      <q-tr
        v-if="bodyProps.expand"
        :props="bodyProps"
      >
        <q-td :colspan="bodyProps.cols.length">
          <q-card class="shadow-0 bg-grey-2">
            <q-card-section>
              <template
                v-for="(doc, dIdx) in bodyProps.row.docs"
                :key="doc.id"
              >
                <q-separator
                  v-if="dIdx"
                  class="q-my-sm"
                  color="grey-500"
                />
                <template
                  v-for="field in DocumentFields"
                  :key="field"
                >
                  <div v-if="visibleFields.includes(field.value)">
                    {{ field.label }}: {{ doc[field.value] }}
                  </div>
                </template>
              </template>
            </q-card-section>
          </q-card>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import pluralize from 'pluralize'
import { DocumentFields, DocumentViewerHeader } from '@/consts/documents'

const props = defineProps<{
  deals: any[]
}>()

// Table search and pagination settings
const search = ref('')
const pagination = ref({
  rowsPerPage: 0
})

// Check if industry is set to visible or not
const filterByField = (field: string, industryName: string) =>
  !filters[field].length || filters[field].includes(industryName)

// Check if the deal includes the search phrase
const searchDeal = (deal: any) => {
  for (const column in deal) {
    if (column === 'id' || column === 'docs') { continue }

    const value = deal[column]
    if (!value) { continue }

    if (`${value}`.toLowerCase().includes(search.value.toLowerCase())) {
      return true
    }
  }

  return false
}

// Industry related options
const filters: Record<string, string[]> = reactive(
  DocumentViewerHeader.reduce((acc, { field }) => ({
    ...acc,
    [field]: []
  }), {})
)

// Document related options
const visibleFields = ref(DocumentFields.map(({ value }) => value))

// Filtered deals
const filteredDeals = computed(() => {
  return DocumentViewerHeader.reduce(
    (deals, { field }) =>
      deals.filter((deal: any) => filterByField(field, deal[field])), props.deals
  ).filter(searchDeal)
})
</script>

<style lang="scss">
.documents-viewer {
  height: calc(100vh - 100px);

  td {
    border-bottom: none;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  thead tr:first-child th {
    color: var(--q-primary);
    background-color: var(--q-secondary);
  }
  tr:nth-child(2n) {
    background-color: #FCFCFC;
  }
  thead tr th, tbody tr.documents-viewer__count td {
    position: sticky;
    z-index: 1;
  }
  thead tr th {
    top: 0;
  }
  tbody tr.documents-viewer__count td {
    top: 48px;
    background-color: #DDDDDD;
  }
}
</style>

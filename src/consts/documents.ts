// Commented out some document fields
// Because I don't have the rule to get them
export const DocumentFields = [
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Folder',
    value: 'folderPath'
  },
  // {
  //   label: 'Dataroom Path',
  //   value: ''
  // },
  {
    label: 'Posted',
    value: 'posted'
  },
  {
    label: 'Created',
    value: 'created'
  },
  {
    label: 'Last Accessed',
    value: 'lastAccessed'
  },
  // {
  //   label: 'Access',
  //   value: 'hasPrivateAccess'
  // },
  {
    label: 'Filetype',
    value: 'fileType'
  },
  {
    label: 'Size',
    value: 'size'
  },
  {
    label: 'Note',
    value: 'emailNote'
  },
  {
    label: 'Read',
    value: 'read'
  },
  // {
  //   label: 'Archived',
  //   value: ''
  // }
].sort((a, b) => a.label.localeCompare(b.label))

export const DocumentViewerHeader: any[] = [
  {
    name: 'deal',
    label: 'Deal',
    field: 'dealName',
    align: 'left',
    sortable: true
  },
  {
    name: 'issuer',
    label: 'Issuer',
    field: 'issuerName',
    align: 'left',
    sortable: true
  },
  {
    name: 'industry',
    label: 'Industry',
    field: 'industryName',
    align: 'left',
    sortable: true
  },
  {
    name: 'access',
    label: 'Access',
    field: 'access',
    align: 'left',
    sortable: true
  },
  {
    name: 'agent',
    label: 'Agent',
    field: 'agentName',
    align: 'left',
    sortable: true
  },
  {
    name: 'source',
    label: 'Source',
    field: 'sourceName',
    align: 'left',
    sortable: true
  },
  {
    name: 'dataroom',
    label: 'Dataroom Status',
    field: 'dataroomStatus',
    align: 'left',
    sortable: true
  },
  {
    name: 'type',
    label: 'Type',
    field: 'dealTypeName',
    align: 'left',
    sortable: true
  }
]

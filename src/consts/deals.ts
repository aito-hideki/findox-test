import camelCase from 'lodash/camelCase'
import data from '@/assets/json/data.json'
import docs from '@/assets/json/docs.json'

const { Holdings, Industries, ClientIssuers, Agents, Sources, DealTypes } = data.data

const snakeToCamel = (json: any): any => {
  if (typeof json !== 'object' || !json) {
    return json
  }

  if (Array.isArray(json)) {
    return json.map(snakeToCamel)
  }

  return Object.keys(json).reduce((obj, key) => ({
    ...obj,
    [camelCase(key)]: snakeToCamel(json[key])
  }), {})
}

export const deals = Holdings.map(({
  Id,
  DealName,
  IssuerId,
  IndustryId,
  LastPosted,
  AgentId,
  SourceId,
  // DataroomStatusId,
  TypeId
}) => ({
  id: Id,
  dealName: DealName,
  issuerName: ClientIssuers.find(issuer => issuer.IssuerId === IssuerId)?.IssuerName,
  industryName: Industries.find(industry => industry.Id === IndustryId)?.IndustryName,
  access: LastPosted ? 'Public' : 'Private',
  agentName: Agents.find(agent => agent.Id === AgentId)?.CompanyName,
  sourceName: Sources.find(source => source.Id === SourceId)?.SourceName,
  // Hard coded dataroom status
  // Because I don't have the rules to generate dataroom status from status id
  dataroomStatus: 'In Dataroom',
  dealTypeName: DealTypes.find(deal => deal.Id === TypeId)?.TypeName,
  docs: docs.data.docs.filter(({ holding_id }) => holding_id === Id).map(snakeToCamel)
}))

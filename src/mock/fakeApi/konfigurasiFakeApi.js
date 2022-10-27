export default function konfigurasiFakeApi(server, apiPrefix) {

  server.get(`${apiPrefix}/konfigurasi/pks`, schema => {
    return schema.db.accountFormData[0]
  })

}
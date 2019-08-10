import axios from "axios"
import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class PesertaService extends ServiceGenerator<IPeserta> {
  protected endpoint = api.servicePAC

  public getAnggotaTim(idTim: string) {
    return new Promise<IPeserta[]>((resolve, reject) => {
      axios
        .get(this.endpoint + `tim/${idTim}/peserta/`, {
          headers: this.getHeader(),
        })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}

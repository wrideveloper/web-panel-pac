import axios from "axios"
import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class PengumpulanService extends ServiceGenerator<IPengumpulan> {
  protected endpoint = api.servicePAC

  public getPengumpulanTim(idTim: string) {
    return new Promise<IPengumpulan[]>((resolve, reject) => {
      axios
        .get(this.endpoint + `tim/${idTim}/pengumpulan/`, {
          headers: this.getHeader(),
        })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
}

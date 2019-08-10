import Admin from "../pages/Admin"
import Anggota from "../pages/Anggota"
import Hadiah from "../pages/Hadiah"
import JenisPengumpulan from "../pages/JenisPengumpulan"
import Kontak from "../pages/Kontak"
import Login from "../pages/Login"
import MediaPartner from "../pages/MediaPartner"
import Status from "../pages/Status"
import SupportedBy from "../pages/SupportedBy"
import Tim from "../pages/Tim"
import Timeline from "../pages/Timeline"
import Universitas from "../pages/Universitas"

const routes: IRoute[] = [
  {
    name: "tim",
    component: Tim,
    label: "Tim",
    icon: "group",
    path: "/",
    private: true,
    hide: true,
  },
  {
    name: "tim",
    component: Tim,
    label: "Tim",
    icon: "group",
    path: "/tim",
    private: true,
  },
  {
    name: "anggota",
    component: Anggota,
    label: "Anggota",
    path: "/tim/anggota",
    private: true,
    hide: true,
  },
  {
    name: "status",
    component: Status,
    label: "Data Status Tim",
    icon: "window maximize outline",
    path: "/status",
    private: true,
  },
  {
    name: "jenisPengumpulan",
    component: JenisPengumpulan,
    label: "Jenis Pengumpulan",
    icon: "file outline",
    path: "/jenisPengumpulan",
    private: true,
  },
  {
    name: "hadiah",
    component: Hadiah,
    label: "Hadiah",
    icon: "gift",
    path: "/hadiah",
    private: true,
  },
  {
    name: "kontak",
    component: Kontak,
    label: "Kontak",
    icon: "phone",
    path: "/kontak",
    private: true,
  },
  {
    name: "mediaPartner",
    component: MediaPartner,
    label: "Media Partner",
    icon: "volume up",
    path: "/mediaPartner",
    private: true,
  },
  {
    name: "supportedBy",
    component: SupportedBy,
    label: "Supported By",
    icon: "handshake outline",
    path: "/supportedBy",
    private: true,
  },
  {
    name: "timeline",
    component: Timeline,
    label: "Timeline",
    icon: "calendar alternate outline",
    path: "/timeline",
    private: true,
  },
  {
    name: "universitas",
    component: Universitas,
    label: "Universitas",
    icon: "building outline",
    path: "/universitas",
    private: true,
  },
  {
    name: "admin",
    component: Admin,
    label: "Admin",
    icon: "user outline",
    path: "/admin",
    private: true,
  },
  {
    name: "login",
    component: Login,
    path: "/login",
    hide: true,
  },
]

export default routes

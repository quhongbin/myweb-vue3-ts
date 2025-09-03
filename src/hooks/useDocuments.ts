import { ref } from "vue";
import axios from "axios";

export default function(){
  interface Document {
    id: number;
    title: string;
    file_path: string;
    html_path: string;
    tags: string[];
    file_size: number;
  }
  const documents = ref<Document[]>([]);

async function handleFileUploaded(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  const formData = new FormData();
  formData.append("file", target.files[0]);
  formData.append("title", target.files[0].name);
  await axios
    .post("http://localhost:3000/api/documents", formData, {
      headers: {},
    })
    .then((response) => {
      console.log(response.data);
      documents.value.push(response.data);
    })

    .catch((error) => console.log("Error:" + error));
}

function getFromServer(): void {
  axios
    .get("http://localhost:3000/api/documents", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Documents has received");
      // 处理后端传递的数据,将数据转换为存入documentsu数组中,类型为Document
      for (let i = 0; i < response.data.length; i++) {
        documents.value.push(response.data[i]);
      }
      console.log(documents.value);
    })
    .catch((error) => console.log("From bodyApp.vue getToServer function Error:" + error));
}

function openDocument(path: string): void {
  window.open(path, "_blank");
}
function delDocument(id: number): void {
  const comfiromDel: boolean = window.confirm("确认删除?");
  if (comfiromDel) {
    axios.delete(`http://localhost:3000/api/documents/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          documents.value = documents.value.filter((item) => item.id !== id);
          // window.location.reload()
        }
      })
      .catch((error) => console.log("From bodyApp.vue delDocument function Error:" + error));
  }
}

return {
  documents,
  handleFileUploaded,
  getFromServer,
  openDocument,
  delDocument,
}



}

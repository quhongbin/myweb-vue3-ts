import { ref } from "vue";
import axios from "axios";
import * as yaml from 'js-yaml';
import { type Document } from "@/types";

export default function(){
  const documents = ref<Document[]>([]);

async function handleFileUploaded(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0];
  const formData = new FormData();
  formData.append("file", file);

  // 解析 YAML 元数据
  const { title, tags } = await parseYamlMetadata(file);

  formData.append("title", title);

  // 处理标签
  if (tags.length > 0) {
    formData.append("tags", tags.join(','));
  } else {
    // 如果没有 YAML 标签，使用现有标签逻辑
    const existingTags = getExistingTags();
    formData.append("tags", existingTags.join(','));
  }

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
/////////////////YAML 解析////////////////////

// 解析 YAML 元数据
async function parseYamlMetadata(file: File): Promise<{ title: string; tags: string[] }> {
  let title = file.name;
  let tags: string[] = [];

  try {
    const fileContent = await readFileAsText(file);
    const yamlMatch = fileContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);

    if (yamlMatch && yamlMatch[1]) {
      const yamlContent = yamlMatch[1];
      const yamlMetadata = yaml.load(yamlContent) as Record<string,any>;

      // 从 YAML 元数据中提取标题和标签
      if (yamlMetadata.title) {
        title = yamlMetadata.title;
      }

      if (yamlMetadata.tags && Array.isArray(yamlMetadata.tags)) {
        tags = yamlMetadata.tags;
      } else if (yamlMetadata.tags && typeof yamlMetadata.tags === 'string') {
        tags = yamlMetadata.tags.split(',').map(tag => tag.trim());
      }
    }
  } catch (error) {
    console.warn('YAML 解析失败:', error);
  }

  return { title, tags };
}

// 获取现有标签
function getExistingTags(): string[] {
  const existingTags: string[] = [];
  for (let i = 0; i < documents.value.length; i++) {
    if (documents.value[i].tags !== null) {
      for (let j = 0; j < documents.value[i].tags.length; j++) {
        existingTags.push(documents.value[i].tags[j]);
      }
    }
  }
  return existingTags;
}

// 辅助函数：读取文件内容为文本
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsText(file);
  });
}


/////////////////YAML 解析////////////////////
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

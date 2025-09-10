import {ref,computed} from "vue"
import useDocuments from "./useDocuments";
export default function(){
const {documents} = useDocuments()
  // 分页相关状态
const currentPage = ref(1);
const itemsPerPage = ref(3);
const selectedTag = ref<string | null>(null);


// 计算所有标签
const allTags = computed(() => {
  if (!documents.value) return [];
  const tagsSet = new Set<string>();
  documents.value.forEach(doc => {
    if (doc.tags && Array.isArray(doc.tags)) {
      doc.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet);
});
// 过滤后的文档数据
const filteredDocuments = computed(() => {
  if (!documents.value) return [];
  if (!selectedTag.value) return documents.value;
  return documents.value.filter(doc =>
    doc.tags && Array.isArray(doc.tags) && doc.tags.includes(selectedTag.value!)
  );
});

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredDocuments.value.length / itemsPerPage.value);
});

// 获取当前极页的数据
const currentPageData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredDocuments.value.slice(startIndex, endIndex);
});
// 分页功能
function nextPage():void {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage():void {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
function goToPage(page: number):void {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
// 标签选择功能
function selectTag(tag: string):void {
  selectedTag.value = tag;
  currentPage.value = 1; // 重置到第一页
}
// 清除标签筛选
function clearFilter():void {
  selectedTag.value = null;
  currentPage.value = 1;
}


  return{
    allTags,selectedTag,selectTag,clearFilter,currentPage,currentPageData,totalPages,filteredDocuments,nextPage,prevPage,goToPage,
  }
}

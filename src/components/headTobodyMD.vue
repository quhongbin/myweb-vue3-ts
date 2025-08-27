<script lang="ts" setup>

// export default defineComponent({
//   setup(_, { emit }) {
//     const uploadMarkdown = (e: Event) => {
//       const target = e.target as HTMLInputElement;
//       const file = target.files?.[0];
//       const fileName = file?.name;

//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           emit("MarkdownContentToBody", event.target?.result, fileName);
//         };
//         reader.readAsText(file);
//       }
//     };

//     return {
//       uploadMarkdown,
//     };
//   },
// });
</script>

<template>
  <div>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
}
</style>

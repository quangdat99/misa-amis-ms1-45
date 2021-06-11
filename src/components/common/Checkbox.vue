<template>
  <div style="display: inline-block">
    <input type="checkbox" class="checkbox" :id="id" />
    <label :for="id"></label>
  </div>
</template>

<script>
//#region export
export default {
  //#region data
  data() {
    return {
      id: Math.random(),
    };
  },
  //#endregion
};
//#endregion
</script>
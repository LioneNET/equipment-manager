<template>
  <nav v-if="showPagination" aria-label="Page navigation example">
    <ul class="pagination">
      <li v-if="showArrows" class="page-item" :class="1 === active && 'active'">
        <a class="page-link" href="#" v-on:click="()=>nextPage(1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li v-for="link in arraySlice" 
        :key="link.label" 
        class="page-item" :class="link.label === active && 'active'">
          <a class="page-link" href="#" v-on:click="()=>nextPage(link.label)">{{link.label}}</a>
      </li>
 
      <li v-if="showArrows" class="page-item" :class="lastPage === active && 'active'">
        <a class="page-link" v-on:click="() => nextPage(lastPage)" href="#" >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      active: '1',
      showArrows: false,
      arraySlice: [],
      pagesAround: 2,
      showPagination: false,
      lastPage: 0,
      currentPage: 0,
      links: []
    }
  },
  created() {
    const pageMeta = this.$store.state.equipment.equipmentsPagination
    this.lastPage = pageMeta.last_page
    this.currentPage = pageMeta.current_page;
    this.links = [...pageMeta.links.slice(1, pageMeta.links.length - 1)];

    let data = [...this.links.slice(0, this.currentPage + this.pagesAround)];
    const pages = [...Array(data.length).keys()];
    const index = pages.indexOf(this.currentPage - 1);
    const start = index <= this.pagesAround ? 0 : index - this.pagesAround;
    const end =
      index + this.pagesAround < pages.length
        ? index + 1 + this.pagesAround
        : pages.length;
    this.arraySlice = data.slice(start, end);
    this.showArrows = this.pagesAround <= pages.length;
    if(this.arraySlice.length>1) {
      this.showPagination = true
    }
  },
  methods: {
    nextPage(page) {
      this.currentPage = page
      const data = [...this.links.slice(0, this.currentPage + this.pagesAround)];
      const pages = [...Array(data.length).keys()];
      const index = pages.indexOf(this.currentPage - 1);
      const start = index <= this.pagesAround ? 0 : index - this.pagesAround;
      const end =
        index + this.pagesAround < pages.length
          ? index + 1 + this.pagesAround
          : pages.length;
      this.arraySlice = data.slice(start, end);
      this.active = page
      this.$store.dispatch('fetchEquipments', {page})
    }
  }
};
</script>

<style scoped>
</style>
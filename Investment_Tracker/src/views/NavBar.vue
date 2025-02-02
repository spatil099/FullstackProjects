<template>
    <header>
        <div id="left-items">
            <div id="app_name">Investment Tracker</div>
        </div>
        <div class="spacer"></div>
        <div id="right-items">
            <div><a href="/dashboard"><Button id="dashboard" >Dashboard</Button></a></div>
            <!-- <div><Button id="investments">Investments</Button></div> -->
            <div>
    <CascadeSelect
      v-model="selectedCategories"
      :options="groupedCategories"
      optionLabel="name"
      optionGroupLabel="type"
      optionGroupChildren="items"
      placeholder="Select Investment Category"
    />
            </div>
            <div><a href="/login"><Button id="logout" >Logout</Button></a></div>
        </div>
        
    </header>    
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { useInvestmentCategoriesStore } from '../stores/investment_categories';

// Initialize Pinia store
const investmentCategoriesStore = useInvestmentCategoriesStore();
// Access grouped categories from the store
const groupedCategories = investmentCategoriesStore.groupedCategories;

// Selected category
const selectedCategories = ref(null);
// Fetch data on component mount
onMounted(() => {
  investmentCategoriesStore.getAllCategories();
});
</script>

<style scoped>
header {
    min-height: 3.825rem;
    background-color: white;
    border-bottom: .0625rem solid #ecedee;
    align-items: center;
    display: inline-flex;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
    width: 100%;
    border-width: 2px 2px 10px 2px;
}

#left-items {
    margin-right: .625rem !important;
    box-sizing: border-box;
}
#right-items {
    display: flex;
}

#right-items, div {
    margin: 2px;
    border: 2px;
}

#app_name {
    color: #006fc7;
    cursor: pointer;
    font-size: 2rem;
    margin:2px
}

.spacer {
    flex-grow: 1;
}

</style>
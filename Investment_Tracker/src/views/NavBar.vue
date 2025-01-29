<template>
    <header>
        <div id="left-items">
            <div id="app_name">Investment Tracker</div>
        </div>
        <div class="spacer"></div>
        <div id="right-items">
            <div><a href="/dashboard"><Button id="dashboard" >Dashboard</Button></a></div>
            <div><Button id="investments">Investments</Button></div>
            <div><a href="/login"><Button id="logout" >Logout</Button></a></div>
        </div>
        
    </header>    
</template>

<script setup lang="ts">

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
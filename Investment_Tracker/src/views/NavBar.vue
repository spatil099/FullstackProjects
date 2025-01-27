<template>
    <header>
        <div id="left-items">
            <div id="app_name">Investment Tracker</div>
        </div>
        <div id="right-items">
            <a href="/dashboard"><Button id="dashboard" >Dashboard</Button></a>
            <Button id="investments">Investments</Button>
            <a href="/login"><Button id="logout" >Logout</Button></a>
        </div>
        
    </header>    
</template>

<script setup lang="ts">

</script>

<style scoped>
header {
    height: 60px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: lightgrey
}

#right-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
}

div, Button {
    padding:5px;
    margin:2px;
    font-size:15px
}
</style>
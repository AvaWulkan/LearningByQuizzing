<template>
    <div id="lol">
        <button @click="loginFunction"></button>
    </div>
</template>

<script>
export default{
    name: 'Login',
    methods: {
        loginFunction(){
            console.log('Testing')
        }
    },
}

</script>

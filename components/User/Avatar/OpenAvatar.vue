<template>
    <div style="width:730px;height:920px; margin: 0 auto;top: 10px;position:relative;background-color:gray">
        <div>
            <span style="position:relative;top:5px;left:5px">Фотография пользователя</span>
            <div style="width:700px;margin: 0 auto;position:relative;top:10px">
                <img :src="avatar" width="700" alt="">
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        avatar: {
            type: String,
            default: ''
        }

    }
}
</script>

<template>
    <div class="flex">
        <n-image
        class="mx-auto"
        width="300"
        src="https://upload.wikimedia.org/wikipedia/commons/c/c9/-Insert_image_here-.svg"
        />
    </div>
</template>

<script>
    import { defineComponent } from "vue";
    import {
    NImage,
    } from 'naive-ui'

    export default defineComponent({
    components: {
        NImage
    }
    });
</script>
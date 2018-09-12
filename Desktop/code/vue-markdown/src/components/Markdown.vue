<template>
    <div>
        <div class="columns">
            <div id='m_wrap' 
            @dragover="dragover($event)"
            @drop="drop($event)" 
            class="column r_border">
                <div>
                    <input class="headtitle" type="text" v-model="title">
                </div>
                <div class="featers">
                    <p>功能按钮</p>
                </div>
                <div class="text_wrap">
                    <textarea id="marked" class="v1_text" v-model="markdown"></textarea>
                </div>
            </div>
            <div id='preview' class="column">
                <div :key='markdown' v-markdown>{{ markdown }}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Markdown',
        data() {
            return {
                title: '2018-09-08',
                markdown: '### 好的\n\n#### 不错嘛'

            }
        },
        methods: {
            dragover(e) {
                console.log('dragover')
            },
            drop(e) {
                console.log('drop')
                var c = this.markdown
                this.markdown = c + '\n' + '![key.jpg](jjjjjjjj.jpg)'
            }
        },
        mounted() {

        }

    }
</script>
<style>
    #m_wrap {
        text-align: left;
    }

    .r_border {
        border-right: 1px solid #d9d9d9;
    }

    #preview {
        background: #fcfaf2;
        text-align: left;
    }

    .featers {
        height: 40px;
        line-height: 40px;
        background: #d9d9d9;
    }

    .headtitle {
        height: 60px;
        line-height: 60px;
        width: 100%;
        padding: 0 80px 10px 40px;
        margin-bottom: 0;
        border: none;
        font-size: 30px;
        font-weight: 400;
        line-height: 30px;
        -webkit-box-shadow: none;
        box-shadow: none;
        color: #595959;
        background-color: transparent;
        outline: none;
        border-radius: 0;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .text_wrap {
        
    }

    .v1_text {
        height: calc(100vh - 100px);
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding: 40px 40px 80px;
        margin-bottom: 0;
        resize: none;
        color: #333;
        background-color: transparent;
        font-size: 18px;
        font-weight: 400;
        line-height: 30px;
        border: none;
        outline: none;
        -webkit-appearance: none;
        overflow: auto;
    }
</style>
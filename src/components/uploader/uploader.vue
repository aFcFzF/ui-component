<template>
<div :class="uploaderCls">
    <Modal v-model="preview">
        <div class="text-center">
            <img :src="previewFile.url" class="ui-uploader-preview-image" :alt="previewFile.name"></img>
        </div>
    </Modal>
    <template v-if="type=='image'">
        <div class="ui-uploader-image" v-if="file">
            <div class="ui-uploader-image-background" :style="getBackgroundImage(file)"></div>
            <div class="ui-uploader-progress" v-if="file.status==2||file.status==1">
                <Progress :percent="file.percent" :stroke-width="5"></Progress>
            </div>
            <div class="ui-uploader-image-operate ui-uploader-browse-button" v-else>
                <div>{{showReUploadWord}}</div>
            </div>
        </div>
        <div class="ui-uploader-image-empty ui-uploader-browse-button" v-else>
            <i class="ui-icon-plus"></i>
        </div>
    </template>

    <template v-if="type=='images'">
        <div class="ui-uploader-image-empty ui-uploader-browse-button">
            <i class="ui-icon-plus"></i>
        </div>
        <div v-for="(file, index) in fileList" :key="file.id" class="ui-uploader-image">
            <div class="ui-uploader-image-background" :style="getBackgroundImage(file)"></div>
            <div class="ui-uploader-progress" v-if="file.status==2||file.status==1">
                <Progress :percent="file.percent" :stroke-width="5"></Progress>
            </div>
            <div class="ui-uploader-image-operate" v-else>
                <div>
                    <span class="ui-uploader-operate" @click="previewImage(file)">
                        <i class="ui-icon-fullscreen"></i>
                    </span>
                    <i class="ui-split" v-width="3"></i>
                    <span class="ui-uploader-operate" @click="deleteFile(index)"><i class="ui-icon-trash"></i></span>
                </div>
            </div>
        </div>
    </template>
    <template v-if="type=='file'||type=='files'">
        <div v-if="$slots.dragdrop" class="ui-uploader-browse-button ui-uploader-drop-element" :class="{'ui-uploader-dragging': isdragging}" @dragover="isdragging=true" @dragleave="isdragging=false" @drop="isdragging=false">
            <slot name="dragdrop"></slot>
        </div>
        <div v-else>
            <Button icon="ui-icon-upload" class="ui-uploader-browse-button" v-show="(!isSingle && (!limit || limit > files.length)) || (isSingle&&!files)">{{showUploadWord}}</Button>
        </div>
        <div class="ui-uploader-files">
            <div v-for="(file, index) in fileList" :key="file.id" class="ui-uploader-file">
                <div class="ui-uploader-file-progress" v-if="file.status==2">
                    <Progress :percent="file.percent" :stroke-width="5"><span slot="title">{{file[param.fileName]}}</span></Progress>
                </div>
                <div class="ui-uploader-file-info" v-else>
                    <span class="link" @click="clickfile(file)">{{file.name}}</span><i class="ui-icon-trash middle-right link" @click="deleteFile(index)"></i>
                </div>
            </div>
        </div>
    </template>
</div>
</template>

<script>
import utils from '../../utils/utils';
import config from '../../utils/config';
import Modal from '../modal/modal';

const prefix = 'ui-uploader';

const parse = function (value, param) {
    if (utils.isString(value)) {
        return {
            url: value,
            original: {
                [param.urlName]: value
            }
        };
    }
    else if (utils.isObject(value)) {
        return {
            url: value[param.urlName],
            name: value[param.fileName],
            thumbUrl: value.thumbUrl || param.thumbUrl.call(value),
            original: value
        };
    }
};

const dispose = function (value, type, param) {
    if (type === 'url') {
        return value.url;
    }
    else if (utils.isObject(value)) {
        if (value.original) {
            return value.original;
        }
        return {
            [param.urlName]: value.url,
            [param.fileName]: value.name,
            thumbUrl: value.thumbUrl,
            file: value
        };
    }
};

export default {
    props: {
        type: {
            type: String,
            default: 'file' // files, image, images
        },
        dataType: {
            type: String,
            default: 'file' // url
        },
        uploadList: Array,
        files: {
            type: [Array, Object, String],
            default: () => []
        },
        limit: Number,
        className: String
    },

    data() {
        let param = {};
        if (this.config) {
            param = utils.extend({}, config.getOption('uploader'), this.option);
        }
        else {
            param = utils.extend({}, config.getOption('uploader'), this.option);
        }
        return {
            param,
            preview: false,
            previewFile: {},
            isdragging: false
        };
    },

    methods: {
        clickfile(file) {
            this.$emit('fileclick', file);
        },
        previewImage(file) {
            this.preview = true;
            this.previewFile = file;
        },
        getBrowseButton() {
            return this.$el.querySelector('.ui-uploader-browse-button');
        },
        getDropElement() {
            return this.$el.querySelector('.ui-uploader-drop-element');
        },
        getBackgroundImage(file) {
            let param = {};
            if (file.thumbUrl || file.url) {
                param['background-image'] = `url(${file.thumbUrl || file.url})`;
            }
            return param;
        },
        getFileList() {
            if (this.isSingle) {
                return this.file ? dispose(this.file, this.dataType, this.param) : null;
            }

            let list = [];
            for (let f of this.fileList) {
                list.push(dispose(f, this.dataType, this.param));
            }
            return list;
        },
        deleteFile(index) {
            this.$emit('deletefile', index);
        }
    },

    computed: {
        showReUploadWord() {
            return '重新上传';
        },
        showUploadWord() {
            return '上传';
        },
        isSingle() {
            return this.type === 'image' || this.type === 'file';
        },
        uploaderCls() {
            return {
                [prefix]: true,
                [`${prefix}-${this.type}-container`]: true,
                [this.className]: this.className
            };
        },
        fileList() {
            let list = [];
            if (utils.isArray(this.files)) {
                for (let v of this.files) {
                    list.push(parse(v, this.param));
                }
            }
            else if (this.files) {
                list.push(parse(this.files, this.param));
            }

            if (this.uploadList.length > 0) {
                if (this.isSingle) {
                    list = [this.uploadList[0]];
                }
                else {
                    list.push(...this.uploadList);
                }
            }
            return list;
        },
        file() {
            return this.fileList.length ? this.fileList[0] : null;
        }
    },
    components: {
        Modal
    }
};
</script>

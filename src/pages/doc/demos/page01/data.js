/**
*@file: data.js
*@author: afcfzf (9301462@qq.com)
*/

export default {
    feeOpts: {
        method: {
            name: '付费方式：',
            show: true,
            opts: [{
                    label: '预付费',
                    value: 'pre'
                },
                {
                    label: '后付费',
                    value: 'after'
                }
            ],
            value: 'pre'
        },
        area: {
            name: '当前区域：',
            show: true,
            opts: [{
                    label: '华北-北京',
                    value: 'beijing'
                },
                {
                    label: '华北-保定',
                    value: 'baoding'
                },
                {
                    label: '华南-广州',
                    value: 'guangzhou'
                },
                {
                    label: '华东-苏州',
                    value: 'suzhou'
                },
                {
                    label: '香港',
                    value: 'xianggang'
                }
            ],
            value: 'beijing'
        },
        use: {
            name: '可用区：',
            show: true,
            hasTip: '可用区是指在同一区域下，电力和网络互相独立的区域，故障会被隔离在一个可用区内。如果您的应用程序需要更高的高可用性，建议您将云服务创建在不同的可用区内。',
            opts: [{
                    label: '可用区A',
                    value: 'A'
                },
                {
                    label: '可用区B',
                    value: 'B'
                },
                {
                    label: '可用区C',
                    value: 'C'
                },
                {
                    label: '可用区D',
                    value: 'D'
                }
            ],
            value: 'B'
        }
    },
    configOpt: {
        type: {
            name: '云服务器类型：',
            show: true,
            opts: [{
                    label: '普通型Ⅲ',
                    value: 'normal3',
                    hasTag: 'new',
                    disabled: false,
                    show: true,
                    hasTip: '采用Intel最新一代Skylake Xeon Gold 6148 CPU 2.4GHz。'
                },
                {
                    label: '普通型',
                    value: 'normal',
                    disabled: false,
                    show: true
                },
                {
                    label: '计算优化型',
                    value: 'optimize',
                    disabled: false,
                    show: true,
                    hasTip: '内置Intel Xeon E5 V4 <span style="color: red">3.2GHz</span>超高主频CPU. &nbsp;&nbsp;<a href="#">查看详情>></a>'
                },
                {
                    label: '存储优化型',
                    value: 'store',
                    disabled: false,
                    show: true,
                    hasTip: '售罄！请您移步其他可用区购买资源。'
                },
                {
                    label: 'GPU实例',
                    value: 'GPU',
                    disabled: false,
                    show: true,
                    hasTip: '内置英伟达GPU卡，最高可提供40+Tflops单精度浮点计算能力'
                }
            ],
            value: 'normal3'
        },
        gpuType: {
            name: 'GPU型号',
            show: false,
            help: `
                NVIDIA Tesla P40：3840个CUDA单元、24GB显存、12Tflops单精度浮点运算处理能力。
                <br>
                NVIDIA Tesla P4：2560个CUDA单元、8GB显存、5.5Tflops单精度浮点运算处理能力。
                <br>
                NVIDIA Tesla K40：2880个CUDA单元、12GB显存、4.29Tflops单精度浮点运算处理能力。
                <br>
                NVIDIA 深度学习开发卡：3594个CUDA单元、12GB 显存、11Tflops浮点运算处理能力。
            `,
            opts: [
                {
                    label: 'NVIDIA 深度学习开发卡',
                    value: 'deep',
                    disabled: false,
                    show: true
                },
                {
                    label: 'NVIDIA Tesla P4',
                    value: 'p4',
                    disabled: false,
                    show: true
                },
                {
                    label: 'NVIDIA Tesla P40',
                    value: 'p40',
                    disabled: false,
                    show: true
                }
            ],
            value: 'deep'
        },
        gpuNum: {
            name: 'GPU数量',
            show: false,
            opts: [
                {
                    label: 1,
                    value: 1,
                    disabled: false,
                    show: true
                },
                {
                    label: 2,
                    value: 2,
                    disabled: false,
                    show: true
                },
                {
                    label: 4,
                    value: 4,
                    disabled: false,
                    show: true
                }
            ],
            value: 1
        },
        cpu: {
            name: 'CPU：',
            show: true,
            hasTip: '如需特殊规格配置，可提交工单审核<a href="#">工单入口>></a>',
            opts: [{
                    label: '1核',
                    value: 1,
                    disabled: false,
                    show: true
                },
                {
                    label: '2核',
                    value: 2,
                    disabled: false,
                    show: true
                },
                {
                    label: '4核',
                    value: 4,
                    disabled: false,
                    show: true
                },
                {
                    label: '8核',
                    value: 8,
                    disabled: false,
                    show: true
                },
                {
                    label: '16核',
                    value: 16,
                    disabled: false,
                    show: true
                },
                {
                    label: '32核',
                    value: 32,
                    disabled: false,
                    show: true
                },
                {
                    label: '64核',
                    value: 64,
                    disabled: false,
                    show: true
                },
                {
                    label: '96核',
                    value: 96,
                    disabled: false,
                    show: true
                }
            ],
            value: 1
        },
        memory: {
            name: '内存：',
            show: true,
            opts: [{
                    label: '1GB',
                    value: 1,
                    disabled: false,
                    show: true
                },
                {
                    label: '2GB',
                    value: 2,
                    disabled: false,
                    show: true
                },
                {
                    label: '4GB',
                    value: 4,
                    disabled: false,
                    show: true
                },
                {
                    label: '8GB',
                    value: 8,
                    disabled: false,
                    show: false
                },
                {
                    label: '16GB',
                    value: 16,
                    disabled: false,
                    show: false
                }
            ],
            value: 1
        },
        image: {
            name: '镜像类型：',
            show: true,
            opts: [{
                    label: '公共镜像',
                    value: 'public',
                    disabled: false,
                    show: true

                },
                {
                    label: '自定义镜像',
                    value: 'custom',
                    disabled: true,
                    show: true
                },
                {
                    label: '服务集成镜像',
                    value: 'server',
                    disabled: false,
                    show: true
                },
                {
                    label: '共享镜像',
                    value: 'share',
                    disabled: true,
                    show: true
                },
                {
                    label: '云市场镜像',
                    value: 'cloud',
                    disabled: false,
                    show: true,
                    hasTip: '由第三方服务商提供的，经百度云审核后发布在云市场的镜像环境。包含丰富的服务运行环境和应用软件，可帮助您快速应对各类解决方案场景（目前暂不支持后付费镜像）。'
                }
            ],
            value: 'public'
        }
    },
    systemOpt: {
        name: '操作系统：',
        show: true,
        opts: [{
                label: 'centOS',
                icon: 'ui-icon-left',
                value: 'centOS',
                disabled: false,
                show: true
            },
            {
                label: 'debian',
                icon: 'ui-icon-left',
                value: 'debian',
                disabled: false,
                show: true
            },
            {
                label: 'opensuse',
                icon: 'ui-icon-left',
                value: 'opensuse',
                disabled: false,
                show: true
            },
            {
                label: 'windows Server',
                icon: 'ui-icon-left',
                value: 'winserver',
                disabled: false,
                show: true
            }
        ],
        value: 'centOS'
    },
    versionOpt: {
        centOS: {
            opts: [
                {
                    label: '7.5 x86_64 (64bit)',
                    value: 7.5
                },
                {
                    label: '7.4 x86_64 (64bit)',
                    value: 7.4
                },
                {
                    label: '7.3 x86_64 (64bit)',
                    value: 7.3,
                    disabled: true
                },
                {
                    label: '7.2 x86_64 (64bit)',
                    value: 7.2
                },
                {
                    label: '7.1 x86_64 (64bit)',
                    value: 7.1
                }
            ],
            value: 7.2
        },
        debian: {
            opts: [
                {
                    label: '9.1.0 amd64 (64bit)',
                    value: 9.1
                },
                {
                    label: '9.0.0 amd64 (64bit)',
                    value: 9.0
                },
                {
                    label: '8.9.0 amd64 (64bit)',
                    value: 8.9
                }
            ],
            value: 9.0
        },
        opensuse: {
            opts: [
                {label: '42.3 x86_64 (64bit)', value: '42.3'}
            ],
            value: 42.3
        },
        winserver: {
            opts: [
                {label: 'windows 2012', value: '2012'},
                {label: 'windows 2014', value: '2014'},
                {label: 'windows 2018', value: '2018'},
                {label: 'windows 2019', value: '2019'}
            ],
            value: 2014
        }
    },
    systemVersion: {
        opts: [],
        value: ''
    },
    storeOpts: {
        systemDisk: {
            label: '系统盘',
            opts: [
                {
                    type: 'selector',
                    name: '磁盘选项',
                    opts: [
                        {label: '高性能云盘', value: 'senior'},
                        {label: 'SSD云磁盘', value: 'ssd'}
                    ],
                    value: 'senior'
                },
                {
                    type: 'slider',
                    name: '磁盘大小',
                    value: 0
                },
                {
                    type: 'input',
                    name: '磁盘输入框',
                    class: 'valume',
                    value: 0
                },
                {
                    type: 'button',
                    name: '删除',
                    class: 'ui-btn-text-primary',
                    icon: 'ui-icon-close',
                    event: {
                        click: 'removeDisk'
                    },
                    hidden: true
                },
                {
                    type: 'tag',
                    name: '提示文字',
                    content: '峰值性能 - 随机IO 2160 IOPS，吞吐量 69 MB/s；免费赠送40GB，超出部分需要单独付费',
                    class: 'ui-tag ui-tag-split ui-tag-no-bg',
                    br: true
                }
            ]
        },
        cds: {
            label: 'CDS云磁盘',
            opts: [
                {
                    type: 'group',
                    name: 'cds-group',
                    br: true,
                    template: [
                        {
                            type: 'selector',
                            name: '磁盘选项',
                            opts: [
                                {label: '普通云磁盘', value: 'ssd'},
                                {label: '高性能云盘', value: 'senior'},
                                {label: 'SSD云磁盘', value: 'ssd'}
                            ],
                            value: 'senior'
                        },
                        {
                            type: 'slider',
                            name: '磁盘大小',
                            value: 0
                        },
                        {
                            type: 'input',
                            name: '磁盘输入框',
                            class: 'valume',
                            value: 0
                        },
                        {
                            type: 'button',
                            name: '删除',
                            class: 'ui-btn-text-red ui-btn-no-border',
                            icon: 'ui-icon-close',
                            event: {
                                click: {
                                    name: 'removeDisk'
                                }
                            }
                        },
                        {
                            type: 'tag',
                            name: '提示文字',
                            content: '峰值性能 - 随机IO 2160 IOPS，吞吐量 69 MB/s；免费赠送40GB，超出部分需要单独付费',
                            class: 'ui-tag ui-tag-split ui-tag-no-bg',
                            br: true
                        }
                    ],
                    opts: [],
                    value: []
                },
                {
                    type: 'button',
                    name: '创建CDS磁盘',
                    class: 'ui-btn-primary',
                    icon: 'ui-icon-plus',
                    event: {
                        click: {
                            name: 'createCds'
                        }
                    }
                },
                {
                    type: 'button',
                    name: '从快照创建CDS磁盘',
                    disabled: true
                },
                {
                    type: 'tooltip',
                    name: '提示',
                    content: 'CDS（Cloud Disk Service）即云磁盘服务， 是基于三副本存储机制的高可靠性、高伸缩性和高迁移能力的块存储磁盘设备最多可同时挂载5块云磁盘',
                    icon: 'ui-icon-info'
                },
                {
                    type: 'tag',
                    name: '提示文字2',
                    content: '一个实例最多只能挂载5块磁盘',
                    class: 'ui-tag ui-tag-split ui-tag-no-bg',
                    br: true
                },
                {
                    type: 'tag',
                    name: '提示文字3',
                    content: '如何选择 SSD云磁盘 / 高性能云磁盘 / 普通云磁盘，<a href="#">请查看详细说明>></a>',
                    class: 'ui-tag ui-tag-split ui-tag-no-bg',
                    br: true
                }
            ]
        },
        strategy: {
            label: '绑定快照策略',
            opts: [
                {
                    type: 'switch',
                    name: '是否绑定快照策略',
                    value: false
                }
            ]
        }
    },
    resourceOpts: {
        publicIp: {
            label: '公网IP',
            opts: [
                {
                    type: 'radios',
                    datas: [
                        {label: '购买弹性公网IP', value: 'public'},
                        {label: '暂不需要', value: 'no'}
                    ],
                    value: 'public'
                }
            ]
        },
        resourceName: {
            label: '名称',
            opts: [
                {
                    type: 'input',
                    placeholder: '请输入公网ip地址'
                },
                {
                    type: 'tag',
                    class: 'ui-tag ui-tag-split ui-tag-no-bg',
                    br: true,
                    content: '请输入名称'
                }
            ]
        },
        publicNet: {
            label: '公网宽带',
            opts: [
                {
                    type: 'radio-group',
                    datas: [
                        {label: '包年包月计费', value: 'year'},
                        {label: '按流量计费', value: 'valume'},
                        {label: '按使用宽带计费', value: 'used'}
                    ],
                    value: 'year'
                }
            ]
        }
    },
    networkOpts: {
        netType: {
            label: '网络类型',
            opts: [
                {
                    type: 'selector',
                    datas: [
                        {label: '默认私有网络（192.168.0.0/16）', value: 'default'},
                        {label: '默认公网地址', value: 'public'}
                    ],
                    value: 'default'
                },
                {
                    type: 'selector',
                    datas: [
                        {label: '系统预定义子网B（192.168.16.0/20）', value: 'default'},
                        {label: '默认公网地址', value: 'public'}
                    ],
                    value: 'default'
                },
                {
                    type: 'tag',
                    br: true
                },
                {
                    type: 'selector',
                    datas: [
                        {label: '默认安全组', value: 'default'}
                    ],
                    autosize: true,
                    value: 'default',
                    br: true
                },
                {
                    type: 'tag',
                    class: 'ui-tag ui-tag-split ui-tag-no-bg',
                    br: true,
                    content: '安全组是在服务器外部做防护，如果服务器本身有防火墙（如windows高级安全防火墙，Linux的iptables防火墙）则需要在防火墙做相应设置。请在实例创建后，根据实际访问需求添加或修改访问规则'
                }
            ]
        }
    },
    tagOpts: {
        bindTag: {
            label: '绑定标签',
            opts: [
                {
                    type: 'label',
                    content: '标签键'
                },
                {
                    type: 'selector',
                    datas: [
                        {label: '默认安全组', value: 'default'}
                    ],
                    autosize: true,
                    value: 'default'
                },
                {
                    type: 'label',
                    content: '值',
                    class: 'secondary-color'
                },
                {
                    type: 'selector',
                    datas: [
                        {label: '选择或手动输入', value: 'default'}
                    ],
                    autosize: true,
                    value: 'default'
                },
                {
                    type: 'tag',
                    br: true
                },
                {
                    type: 'button',
                    name: '添加标签',
                    class: 'ui-btn-primary ui-btn-xs'
                },
                {
                    type: 'tooltip',
                    after: '帮助文档',
                    content: '省略xxxx个字',
                    theme: 'white',
                    placement: 'right',
                    icon: 'ui-icon-info weakest-color'
                },
                {
                    type: 'tag',
                    br: true
                },
                {
                    type: 'switch',
                    before: '其关联资源CDS、EIP统一加标签：',
                    value: true
                }
            ]
        }
    },
    systemInfoOpts: {
        instanceName: {
            label: '实例名称',
            opts: [
                {
                    type: 'radio-group',
                    datas: ['随机生成', '用户自定义'],
                    value: '随机生成'
                }
            ]
        },
        adminName: {
            label: '管理用户名',
            opts: [{
                type: 'label',
                content: 'root'
            }]
        },
        adminPsw: {
            label: '管理员密码',
            opts: [
                {
                    type: 'radio-group',
                    datas: ['随机生成', '用户自定义', '密钥对'],
                    value: '密钥对'
                },
                {
                    type: 'tooltip',
                    icon: 'ui-icon-info',
                    placement: 'right',
                    content: 'SSH密钥对是一种比常规密码更安全的登录云服务器的方式，更多内容详见帮助文档'
                }
            ]
        }
    },
    orderInfoOpts: {
        time: {
            label: '购买时常',
            opts: [
                {
                    type: 'radio-group',
                    datas: [
                        {label: '1个月', value: 1},
                        {label: '2', value: 2},
                        {label: '3', value: 3},
                        {label: '4', value: 4},
                        {label: '5', value: 5},
                        {label: '6', value: 6},
                        {label: '7', value: 7},
                        {label: '8', value: 8},
                        {label: '9', value: 9},
                        {label: '1年', value: 12},
                        {label: '2年', value: 24},
                        {label: '3年', value: 36}
                    ],
                    value: 1
                }
            ]
        },
        count: {
            label: '购买个数',
            opts: [
                {
                    type: 'button',
                    name: '+'
                }
            ]
        },
        autoPay: {
            label: '自动续费',
            opts: [
                {
                    type: 'switch',
                    value: false,
                    after: '<a>什么是自动续费</a>'
                },
                {
                    type: 'tag',
                    class: 'ui-tag ui-tag-split',
                    br: true,
                    content: `
                    温馨提示：
                    <br>
                    1. 弹性公网IP（EIP）需绑定在负载均衡（BLB）或预付费云服务器（BCC）上方可进行备案。
                    <br>
                    2. 若您涉及网站部署并需要使用独立域名，请绑定弹性公网IP（EIP）并进行备案；目前暂不受理西藏地区备案业务，请慎重购买。
                    `
                }
            ]
        }
    }
};

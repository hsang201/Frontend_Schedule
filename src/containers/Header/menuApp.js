export const adminMenu = [
    { //người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-chedule'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.manage-crud', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            { //quả lý kế hoạch khám bệnh của bác sĩ

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            },
        ]
    },
    { //phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },
    { //phòng khám
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.doctor.manage-schedule',
        menus: [
            { //quả lý kế hoạch khám bệnh của bác sĩ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            { //quả lý bệnh nhân khám bệnh của bác sĩ
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            },
        ]
    }
]
import config from '../../playwright.config';


export const local_user = {
    email: config.projects[0].staffEmail,
    password: config.projects[0].staffPassword,
};

export const student_user = {
    email: config.projects[0].studentEmail,
    password: config.projects[0].studentPassword,
}

export const admin_user = {
    email: config.projects[0].adminEmail,
    password: config.projects[0].adminPassword,

}
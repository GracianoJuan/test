import axios from "axios";


const getCsrfToken = () => {
    const meta = document.head.querySelector('meta[name="csrf-token"]');
    return meta?.getAttribute('content') || '';
};

const apiClient = axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
        'X-Requested-With': 'XMLHttpRequest',
        'jwt' : 'jwt'
    }
});

// apiClient.interceptors.request.use(
//     async
// )

export const apiService = {
    // Partner form
    async getQuestions(){
        try {
            const response = await apiClient.get('/form/hello');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    // send answer to db (will use debouncing for ts)
    async postAnswer(data : string){
        try {
            const response = await apiClient.post('/form/answer', data)
            return response.data
        } catch (error) {
            console.error(error)
        }
    },


    async upsertAnswer(){
        try {
            const response = await apiClient.patch('/upsert')
            return response.data
        } catch (error) {
            
        }
    },
    // store the form (section) to database (cannot sending it to ealuator yet)
    async postForm(){},
    // Mark all their form to done so the evaluator
    async submitForm(){},

    // IDD evaluation api section
    async getFormList(){},
    async getFormAnswer(){},
    async postEvaluation(){},
    async updateEvaluation(data : any){
        try {
            const response = await apiClient.patch('/')
            return response.data
        } catch (error) {
            
        }
    },

    // admin
    async getAllUsers(){
        try {
            const response = await apiClient.get('/')
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    async getAllReq(){},
    async getProfile(id : number){
        try {
            const data = await apiClient.get('/')
            return data
        } catch (error) {
            console.error(error)
        }
    },
    async editProfile(){
        try {
            const response = await apiClient.patch('/')
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    async updateUser(){
        try {
            const response = await apiClient.patch('')
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    async deleteUser(){
        try {
            const response = await apiClient.delete('')
        } catch (error) {
            console.error(error)
        }
    },
}
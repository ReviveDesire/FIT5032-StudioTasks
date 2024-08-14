<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">User Information Form</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-6">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" @blur="() => validateName(true)"
                                @input="() => validateName(false)" v-model="formData.username" />
                            <div class="text-danger" v-if="errors.username">{{ errors.username }}</div>
                        </div>
                        <div class="col-6">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password"
                                @blur="() => validatePassword(true)" @input="() => validatePassword(false)"
                                v-model="formData.password" />
                            <div class="text-danger" v-if="errors.password">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-6">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian"
                                    @blur="() => validateResident(true)" @input="() => validateResident(false)"
                                    v-model="formData.isAustralian" />
                                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                                <div class="text-danger" v-if="errors.resident">{{ errors.resident }}</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" @blur="() => validateGender(true)"
                                @input="() => validateGender(false)" v-model="formData.gender">
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                            <div class="text-danger" v-if="errors.gender">{{ errors.gender }}</div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining</label>
                        <textarea class="form-control" id="reason" @blur="() => validateReason(true)"
                            @input="() => validateReason(false)" v-model="formData.reason"></textarea>
                        <div class="text-danger" v-if="errors.reason">{{ errors.reason }}</div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-6">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" v-model="formData.email"
                                @blur="() => validateEmail(true)" @input="() => validateEmail(false)" />
                            <div class="text-danger" v-if="errors.email">{{ errors.email }}</div>
                        </div>
                        <div class="col-6">
                            <label for="phoneNumber" class="form-label">Phone Number</label>
                            <input type="text" class="form-control" id="phoneNumber" v-model="formData.phoneNumber"
                                @blur="() => validatePhoneNumber(true)" @input="() => validatePhoneNumber(false)" />
                            <div class="text-danger" v-if="errors.phoneNumber">{{ errors.phoneNumber }}</div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-6">
                            <label for="dob" class="form-label">Date of Birth</label>
                            <input type="date" class="form-control" id="dob" v-model="formData.dob"
                                @blur="() => validateDOB(true)" @input="() => validateDOB(false)" />
                            <div class="text-danger" v-if="errors.dob">{{ errors.dob }}</div>
                        </div>
                        <div class="col-6">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="address" v-model="formData.address"
                                @blur="() => validateAddress(true)" @input="() => validateAddress(false)" />
                            <div class="text-danger" v-if="errors.address">{{ errors.address }}</div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword"
                            v-model="formData.confirmPassword" @blur="() => validateConfirmPassword(true)"
                            @input="() => validateConfirmPassword(false)" />
                        <div class="text-danger" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
            <div class="row mt-5" v-if="submittedCards.length">
                <DataTable :value="submittedCards" class="p-datatable">
                    <Column field="username" header="Username"></Column>
                    <Column field="password" header="Password"></Column>
                    <Column field="isAustralian" header="Australian Resident">
                        <template #body="slotProps">
                            {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
                        </template>
                    </Column>
                    <Column field="gender" header="Gender"></Column>
                    <Column field="reason" header="Reason"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="dob" header="Date of Birth"></Column>
                    <Column field="address" header="Address"></Column>
                    <Column field="phoneNumber" header="Phone Number"></Column>
                    <Column field="confirmPassword" header="Confirmed Password"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
    confirmPassword: '',
    email: '',
    dob: '',
    address: '',
    phoneNumber: ''
});

const submittedCards = ref([]);

const submitForm = () => {
    validateName(true);
    validatePassword(true);
    validateResident(true);
    validateGender(true);
    validateReason(true);
    validateConfirmPassword(true);
    validateEmail(true);
    validateDOB(true);
    validateAddress(true);
    validatePhoneNumber(true);

    if (!errors.value.username && !errors.value.password
        && !errors.value.resident && !errors.value.gender
        && !errors.value.reason && !errors.value.confirmPassword
        && !errors.value.email && !errors.value.dob
        && !errors.value.address && !errors.value.phoneNumber) {
        submittedCards.value.push({
            ...formData.value
        });
        clearForm();
    }
};

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        isAustralian: false,
        reason: '',
        gender: '',
        confirmPassword: '',
        email: '',
        dob: '',
        address: '',
        phoneNumber: ''
    };
};

const errors = ref({
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null,
    confirmPassword: null,
    email: null,
    dob: null,
    address: null,
    phoneNumber: null
});

const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        if (blur) errors.value.username = "Name must be at least 3 characters";
    } else {
        errors.value.username = null;
    }
};

const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
    } else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character.";
    } else {
        errors.value.password = null;
    }
};

const validateResident = (blur) => {
    if (!formData.value.isAustralian) {
        if (blur) errors.value.resident = "You must check the box to confirm that you are an Australian resident."
    } else {
        errors.value.resident = null;
    }
};

const validateGender = (blur) => {
    if (!formData.value.gender) {
        if (blur) errors.value.gender = "You must select one gender."
    } else {
        errors.value.gender = null;
    }
};

const validateReason = (blur) => {
    const minLength = 3;
    if (formData.value.reason.length < minLength) {
        if (blur) errors.value.reason = `Reason must be at least ${minLength} characters long.`;
    } else {
        errors.value.reason = null;
    }
};

// efolio task 4.2 HD

const validateEmail = (blur) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.value.email)) {
        if (blur) errors.value.email = "Please enter a valid email address.";
    } else {
        errors.value.email = null;
    }
};

const validatePhoneNumber = (blur) => {
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    if (!phoneRegex.test(formData.value.phoneNumber)) {
        if (blur) errors.value.phoneNumber = "Please enter a valid 10-digit phone number.";
    } else {
        errors.value.phoneNumber = null;
    }
};

const validateDOB = (blur) => {
    const today = new Date();
    const dob = new Date(formData.value.dob);
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
        if (blur) errors.value.dob = "You must be at least 18 years old.";
    } else {
        errors.value.dob = null;
    }
};

const validateConfirmPassword = (blur) => {
    if (formData.value.password !== formData.value.confirmPassword) {
        if (blur) errors.value.confirmPassword = "Passwords do not match.";
    } else {
        errors.value.confirmPassword = null;
    }
};

const validateAddress = (blur) => {
    if (formData.value.address.trim() === "") {
        if (blur) errors.value.address = "Address cannot be empty.";
    } else {
        errors.value.address = null;
    }
};

</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
    border-radius: 10px 10px 0 0;
}

.list-group-item {
    padding: 10px;
}
</style>
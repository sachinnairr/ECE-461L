import React from 'react';
import FieldSet from '../components/fieldset';
export default function LoginPage() {
    const existing = ["Enter Username", "Enter Password", "User ID"]
    const create = ["Enter Username", "Enter Password", "Re-Enter Password", "User ID"]
    return(
        <div>
           <FieldSet title={"Existing User"} fields={existing} button={"Login"}></FieldSet>
           <FieldSet title={"Create Account"} fields={create} button={"Create Account"}></FieldSet>
        </div>
        
    );
}
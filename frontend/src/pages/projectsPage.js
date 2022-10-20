import React from 'react';
import FieldSet from '../components/fieldset';
export default function ProjectsPage() {
    const existing = ["Enter Project ID"]
    const create = ["Name", "Description", "Project ID"]
    return(
        <div>
           <FieldSet title={"Use Existing Project"} fields={existing} button={"Use Project"}></FieldSet>
           <FieldSet title={"Create Project"} fields={create} button={"Create Project"}></FieldSet>
        </div>
    );
}
"use client";

import { Form, Formik } from "formik";

export default function DoctorSearch() {
  return (
    <section className="flex justify-center">
      <Formik
        initialValues={{
          mock: "",
        }}
        onSubmit={(values) => console.log(values.mock)}
      >
        <Form></Form>
      </Formik>
    </section>
  );
}

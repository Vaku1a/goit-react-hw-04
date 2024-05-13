import { Field, Form, Formik } from "formik";
import { AiOutlineSearch } from "react-icons/ai";
import css from "../SearchBar/SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        onSearch(values.query);
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <div className={css.inputContainer}>
          <Field
            className={css.input}
            type="text"
            name="query"
            placeholder="Enter search..."
          />
          <button type="submit" className={css.searchButton}>
            <AiOutlineSearch className={css.searchIcon} />
          </button>
        </div>
      </Form>
    </Formik>
  );
}

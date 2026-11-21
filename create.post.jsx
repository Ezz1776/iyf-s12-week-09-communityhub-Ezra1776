import { useToggle } from '../hooks/useToggle';
import { useForm } from '../hooks/useForm';
import Button from './shared/Button/Button';
import Input from './shared/Input/Input';
import styles from './CreatePost.module.css';

const validate = (values) => {
  const errors = {};
  if (!values.title?.trim()) errors.title = 'Title is required';
  return errors;
};

function CreatePost({ onAddPost }) {
  const [showTips, tips] = useToggle(false);
  const [showPreview, preview] = useToggle(false);

  const { values, errors, setErrors, handleChange, handleBlur, reset } = useForm(
    { title: '', content: '' },
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title.trim()) {
      setErrors({ title: 'Title is required' });
      return;
    }
    onAddPost(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Real Label + Accessible Input + WCAG AA Contrast */}
      <Input
        label="Post Title"
        name="title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.title}
        required
      />

      <Input
        as="textarea"
        label="Post Content"
        name="content"
        value={values.content}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={4}
      />

      {/* Buttons replacing <div>, explicit type="button", and accessible names */}
      <div className={styles.buttonRow}>
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={tips.toggle}
          aria-label={showTips ? 'Hide writing tips' : 'Show writing tips'}
          aria-expanded={showTips}
        >
          <span aria-hidden="true">💡</span> {showTips ? 'Hide Tips' : 'Tips'}
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={preview.toggle}
          aria-label={showPreview ? 'Hide post preview' : 'Preview post content'}
          aria-expanded={showPreview}
        >
          <span aria-hidden="true">👁️</span> {showPreview ? 'Hide Preview' : 'Preview'}
        </Button>

        <Button type="submit" variant="primary">
          Publish Post
        </Button>
      </div>

      {showTips && (
        <div className={styles.tipBox} role="region" aria-label="Writing tips">
          <p>💡 <strong>Tip:</strong> Keep titles under 60 characters for best engagement.</p>
        </div>
      )}

      {showPreview && (
        <div className={styles.previewBox} role="region" aria-label="Post preview">
          <p>{values.content || <em>No content written yet.</em>}</p>
        </div>
      )}
    </form>
  );
}

export default CreatePost;

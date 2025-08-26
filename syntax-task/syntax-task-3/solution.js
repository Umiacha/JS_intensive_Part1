/**
 * Проверяет валидность объекта поста и его комментариев.
 *
 * @typedef {Object} Comment
 * @property {string} id - Уникальный идентификатор комментария.
 * @property {string} postId - Идентификатор поста, к которому относится комментарий.
 * @property {string} userId - Идентификатор пользователя, написавшего комментарий.
 * @property {string} content - Содержимое комментария.

 * @typedef {Object} Post
 * @property {string} id - Уникальный идентификатор поста.
 * @property {string} userId - Идентификатор автора поста.
 * @property {string} content - Содержимое поста.
 * @property {number} likes - Количество лайков (целое число ≥ 0).
 * @property {Comment[]} comments - Массив комментариев к посту.

 * @typedef {Object} ValidationResult
 * @property {boolean} valid - true, если ошибок нет.
 * @property {string[]} errors - Список текстовых описаний ошибок (если есть).

 * @param {Post} post - Объект поста для валидации.
 * @returns {ValidationResult} Результат валидации поста.
 */
const validatePost = (post) => {
    let valid = true;
    let errors = [];
    // === post must be an object ===
    if (post === null || typeof post !== 'object' || Array.isArray(post)) {
        valid = false;
        errors.push('post must be an object');
        return {
            "valid": valid,
            "errors": errors
        }
    }
    // === post[field] must be string ===
    for (field of ['id', 'userId', 'content']) {
        if (typeof post[field] !== 'string') {
            valid = false;
            errors.push(`post.${field} must be string`);
        }
    }
    // === post.likes must be non negative integer ===
    if (!Number.isInteger(post.likes) || post.likes < 0) {
        valid = false;
        errors.push("post.likes must be non negative integer");
    }
    // === post.comments must be an array ===
    if (post.comments === null || typeof post.comments !== 'object' || !Array.isArray(post.comments)) {
        valid = false;
        errors.push(`post.comments must be an array`);
        return {
            "valid": valid,
            "errors": errors
        }
    }
    for (let i = 0; i < post.comments.length; i++) {
        // === post.comment[{$index}] must be an object ===
        if (post.comments[i] === null || typeof post.comments[i] !== 'object' || Array.isArray(post.comments[i])) {
            valid = false;
            errors.push(`post.comment[${i}] must be an object`);
            continue
        }
        // === post.comment[${index}].${field} must be string ===
        for (field of ['id', 'postId', 'userId', 'content']) {
            if (typeof post.comments[i][field] !== 'string') {
                valid = false;
                errors.push(`post.comment[${i}].${field} must be string`);
            }
        }
    }
    return {
        "valid": valid,
        "errors": errors
    }
}

module.exports.validatePost = validatePost;
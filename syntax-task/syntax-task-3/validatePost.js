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
export const validatePost = (post) => {
    return {}
}
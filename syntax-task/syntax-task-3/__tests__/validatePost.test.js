const { faker } = require('@faker-js/faker');
const { validatePost } = require('../solution.js');

describe('validatePost', () => {
  const validPost = {
    id: 'post1',
    userId: 'user1',
    content: 'This is a post',
    likes: 5,
    comments: [],
  };

  // ——————— Проверка, что post — объект ———————
  it.each([
    { value: null, typeLabel: 'null' },
    { value: undefined, typeLabel: 'undefined' },
    { value: 'string', typeLabel: 'string' },
    { value: 123, typeLabel: 'number' },
    { value: true, typeLabel: 'boolean' },
    { value: [], typeLabel: 'array' },
  ])('Ошибка, если post — $typeLabel (не объект)', ({ value }) => {
    const result = validatePost(value);
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual(['post must be an object']);
  });

  // ——————— Проверка обязательных полей ———————
  describe('Проверка обязательных полей', () => {
    const invalidCases = [
      { value: null, typeLabel: 'null' },
      { value: undefined, typeLabel: 'undefined' },
      { value: 123, typeLabel: 'number' },
      { value: true, typeLabel: 'boolean' },
      { value: [], typeLabel: 'array' },
      { value: {}, typeLabel: 'object' },
    ];

    it.each(invalidCases)(
      'Ошибка, если id — $typeLabel (не строка)',
      ({ value }) => {
        const post = {
          ...validPost,
          id: value,
        };

        const result = validatePost(post);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('post.id must be string');
      }
    );

    it.each(invalidCases)(
      'Ошибка, если userId — $typeLabel (не строка)',
      ({ value }) => {
        const post = {
          ...validPost,
          userId: value,
        };

        const result = validatePost(post);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('post.userId must be string');
      }
    );

    it.each(invalidCases)(
      'Ошибка, если content — $typeLabel (не строка)',
      ({ value }) => {
        const post = {
          ...validPost,
          content: value,
        };

        const result = validatePost(post);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('post.content must be string');
      }
    );
  });

  // ——————— Проверка likes ———————
  describe('Проверка likes', () => {
    const invalidCases = [
      { value: null, typeLabel: 'null' },
      { value: undefined, typeLabel: 'undefined' },
      { value: '5', typeLabel: 'string' },
      { value: 1.5, typeLabel: 'float' },
      { value: -1, typeLabel: 'negative' },
      { value: true, typeLabel: 'boolean' },
      { value: [], typeLabel: 'array' },
      { value: {}, typeLabel: 'object' },
    ];

    it.each(invalidCases)(
      'Ошибка, если likes — $typeLabel (не целое число ≥ 0)',
      ({ value }) => {
        const post = {
          ...validPost,
          likes: value,
        };

        const result = validatePost(post);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('post.likes must be non negative integer');
      }
    );

    it('Валидный likes проходит проверку', () => {
      const post = {
        ...validPost,
        likes: 0,
      };

      const result = validatePost(post);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  // ——————— Проверка comments ———————
  describe('Проверка comments', () => {
    const invalidCases = [
      { value: null, typeLabel: 'null' },
      { value: undefined, typeLabel: 'undefined' },
      { value: '[]', typeLabel: 'string' },
      { value: {}, typeLabel: 'object' },
      { value: 5, typeLabel: 'number' },
      { value: true, typeLabel: 'boolean' },
    ];
  
    it.each(invalidCases)(
      'Ошибка, если comments — $typeLabel (не массив)',
      ({ value }) => {
        const post = {
          ...validPost,
          comments: value,
        };
  
        const result = validatePost(post);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('post.comments must be an array');
      }
    );
  
    it.each([
      { value: null, typeLabel: 'null' },
      { value: faker.string.alphanumeric(), typeLabel: 'string' },
      { value: faker.number.int(), typeLabel: 'number' },
      { value: faker.datatype.boolean(), typeLabel: 'boolean' },
      { value: [], typeLabel: 'array' },
    ])('Ошибка, если комментарий — $typeLabel (не объект)', ({ value }) => {
      const post = {
        ...validPost,
        comments: [value],
      };
  
      const result = validatePost(post);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('post.comment[0] must be an object');
    });
  
    describe('Проверка полей комментария', () => {
      const commentTemplate = {
        id: 'comment1',
        postId: 'post1',
        userId: 'user1',
        content: 'Good!',
      };
  
      const invalidValues = [
        { value: null, typeLabel: 'null' },
        { value: undefined, typeLabel: 'undefined' },
        { value: 123, typeLabel: 'number' },
        { value: true, typeLabel: 'boolean' },
        { value: [], typeLabel: 'array' },
        { value: {}, typeLabel: 'object' },
      ];
  
      it.each(invalidValues)(
        'Ошибка, если comment.id — $typeLabel (не строка)',
        ({ value }) => {
          const post = {
            ...validPost,
            comments: [
              {
                ...commentTemplate,
                id: value,
              },
            ],
          };
  
          const result = validatePost(post);
          expect(result.valid).toBe(false);
          expect(result.errors).toContain('post.comment[0].id must be string');
        }
      );
  
      it.each(invalidValues)(
        'Ошибка, если comment.postId — $typeLabel (не строка)',
        ({ value }) => {
          const post = {
            ...validPost,
            comments: [
              {
                ...commentTemplate,
                postId: value,
              },
            ],
          };
  
          const result = validatePost(post);
          expect(result.valid).toBe(false);
          expect(result.errors).toContain('post.comment[0].postId must be string');
        }
      );
  
      it.each(invalidValues)(
        'Ошибка, если comment.userId — $typeLabel (не строка)',
        ({ value }) => {
          const post = {
            ...validPost,
            comments: [
              {
                ...commentTemplate,
                userId: value,
              },
            ],
          };
  
          const result = validatePost(post);
          expect(result.valid).toBe(false);
          expect(result.errors).toContain('post.comment[0].userId must be string');
        }
      );
  
      it.each(invalidValues)(
        'Ошибка, если comment.content — $typeLabel (не строка)',
        ({ value }) => {
          const post = {
            ...validPost,
            comments: [
              {
                ...commentTemplate,
                content: value,
              },
            ],
          };
  
          const result = validatePost(post);
          expect(result.valid).toBe(false);
          expect(result.errors).toContain('post.comment[0].content must be string');
        }
      );
  
      it('Ошибка, если один из комментариев не валиден', () => {
        const post = {
          ...validPost,
          comments: [
            {
              id: 'comment1',
              postId: 'post1',
              userId: 'user1',
              content: 'Good!',
            },
            {
              id: 123, // ❌ Не строка
              postId: 'post1',
              userId: 'user1',
              content: 'Bad!',
            },
          ],
        };
  
        const result = validatePost(post);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('post.comment[1].id must be string');
      });
  
      it('Все поля комментария валидны', () => {
        const post = {
          ...validPost,
          comments: [
            {
              id: 'comment1',
              postId: 'post1',
              userId: 'user1',
              content: 'Nice post!',
            },
          ],
        };
  
        const result = validatePost(post);
        expect(result.valid).toBe(true);
        expect(result.errors.length).toBe(0);
      });
    });
  });
  // ——————— Валидный пост ———————
  it('Валидный пост проходит проверку', () => {
    const post = {
      id: 'post1',
      userId: 'user1',
      content: 'Hello world!',
      likes: 10,
      comments: [
        {
          id: 'c1',
          postId: 'post1',
          userId: 'user1',
          content: 'Nice post 1!',
        },
        {
          id: 'c2',
          postId: 'post2',
          userId: 'user2',
          content: 'Nice post 2!',
        },
      ],
    };

    const result = validatePost(post);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });
});
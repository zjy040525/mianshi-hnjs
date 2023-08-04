import type { Student } from '@/typings';

/**
 * 用于过滤重复项
 * @param filterable 过滤的字段
 * @param students 学生列表
 * @author Jia-Yao Zhao
 */
export const filterMap = (filterable: keyof Student, students: Student[]) => {
  const map = new Map<number, string>();
  for (const student of students) {
    const obj = student[filterable];
    if (!obj) {
      break;
    }
    if (typeof obj !== 'object') {
      break;
    }
    // 用于过滤重复项
    if (!map.has(obj.id)) {
      map.set(obj.id, obj.nickname ?? obj.username);
    }
  }
  // 排序
  return [...map]
    .map(([value, text]) => ({ text, value }))
    .sort((a, b) => a.value - b.value);
};

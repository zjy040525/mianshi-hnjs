import type { Student } from '@/typings';

/**
 * 用于过滤重复项
 * @param filterable 过滤的字段
 * @param students 学生列表
 * @author Jia-Yao Zhao
 */
export const filterUser = (
  studentList: Student[],
  filterable: keyof Student,
  iteratee: keyof Student,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map = new Map<any, string>();
  for (const student of studentList) {
    const obj = student[filterable];
    if (!obj || typeof obj !== 'object') {
      continue;
    }
    // 用于过滤重复项
    if (!map.has(student[iteratee])) {
      map.set(student[iteratee], obj.nickname || obj.username);
    }
  }
  // 排序
  return [...map]
    .map(([value, text]) => ({ text, value }))
    .sort((a, b) => a.value - b.value);
};

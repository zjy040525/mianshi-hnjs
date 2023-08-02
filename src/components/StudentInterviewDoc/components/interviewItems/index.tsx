import type { Student } from '@/typings';
import type { DescriptionsItemProps } from 'antd/es/descriptions/Item';
import classes from './index.module.less';

export const interviewItems: (student: Student) => DescriptionsItemProps = (
  student,
) => {
  return {
    label: (
      <>
        <div className={classes.space}>面试专业一</div>
        <div className={classes.space}>面试专业二</div>
        <div>面试专业三</div>
      </>
    ),
    children: [
      student.interview_gd
        ? { weight: 3, element: '城市轨道交通运输与管理' }
        : { weight: 0, element: '-' },
      student.interview_ly
        ? { weight: 2, element: '旅游服务与管理' }
        : { weight: 0, element: '-' },
      student.interview_xq
        ? { weight: 1, element: '幼儿教育' }
        : { weight: 0, element: '-' },
    ]
      .sort((a, b) => b.weight - a.weight)
      .map((value, index, array) => {
        return (
          <div
            key={index}
            className={index < array.length - 1 ? classes.space : undefined}
          >
            {value.element}
          </div>
        );
      }),
  };
};

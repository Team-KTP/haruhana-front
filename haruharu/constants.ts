import { CategoryTopic, Difficulty } from './types';

export const TOPICS: CategoryTopic[] = [
  { id: 't1', name: 'Spring Framework', categoryId: 'c1' },
  { id: 't2', name: 'React.js', categoryId: 'c2' },
  { id: 't3', name: '알고리즘 (Algorithm)', categoryId: 'c3' },
  { id: 't4', name: '데이터베이스 (DB)', categoryId: 'c3' },
  { id: 't5', name: '네트워크 (Network)', categoryId: 'c3' },
  { id: 't6', name: '운영체제 (OS)', categoryId: 'c3' },
];

export const DIFFICULTIES = [
  { value: Difficulty.EASY, label: '쉬움 (개념 확인)' },
  { value: Difficulty.MEDIUM, label: '보통 (응용)' },
  { value: Difficulty.HARD, label: '어려움 (심화)' },
];

export const APP_NAME = "하루하루";

export const MOCK_USER_ID = "user-12345";
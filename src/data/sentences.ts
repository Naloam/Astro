import a from '@/sentences/a.json';
import b from '@/sentences/b.json';
import c from '@/sentences/c.json';
import d from '@/sentences/d.json';
import e from '@/sentences/e.json';
import f from '@/sentences/f.json';
import g from '@/sentences/g.json';
import h from '@/sentences/h.json';
import i from '@/sentences/i.json';
import j from '@/sentences/j.json';
import k from '@/sentences/k.json';
import l from '@/sentences/l.json';

const allSentences = [...a, ...b, ...c, ...d, ...e, ...f, ...g, ...h, ...i, ...j, ...k, ...l];

export const getRandomSentence = () => {
  const randomIndex = Math.floor(Math.random() * allSentences.length);
  const sentence = allSentences[randomIndex];
  return {
    content: sentence.hitokoto,
    author: sentence.from_who || sentence.from,
    title: sentence.from
  };
}; 
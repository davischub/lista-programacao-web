const alunos = [
  { nome: "Maria",   nota1: 8,  nota2: 7  },
  { nome: "João",    nota1: 4,  nota2: 5  },
  { nome: "Ana",     nota1: 9,  nota2: 10 },
  { nome: "Pedro",   nota1: 3,  nota2: 4  },
  { nome: "Larissa", nota1: 7,  nota2: 6  },
];

function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

const alunosComMedia = alunos.map(aluno => ({
  ...aluno,
  media: calcularMedia(aluno.nota1, aluno.nota2)
}));

const aprovados  = alunosComMedia.filter(aluno => aluno.media >= 6);
const reprovados = alunosComMedia.filter(aluno => aluno.media < 6);

const somaMedias  = alunosComMedia.reduce((acc, aluno) => acc + aluno.media, 0);
const mediaGeral  = somaMedias / alunosComMedia.length;

const alunosOrdenados = [...alunosComMedia].sort((a, b) => b.media - a.media);

console.log("===== TODOS OS ALUNOS =====");
alunosComMedia.forEach(aluno => {
  console.log(`${aluno.nome} → Nota 1: ${aluno.nota1} | Nota 2: ${aluno.nota2} | Média: ${aluno.media}`);
});

console.log("\n===== APROVADOS =====");
aprovados.forEach(aluno => console.log(`${aluno.nome} - Média: ${aluno.media}`));

console.log("\n===== REPROVADOS  =====");
reprovados.forEach(aluno => console.log(`${aluno.nome} - Média: ${aluno.media}`));

console.log(`\n===== MÉDIA GERAL DA TURMA: ${mediaGeral} =====`);

console.log("\n===== RANKING POR MÉDIA =====");
alunosOrdenados.forEach((aluno, index) => {
  console.log(`${index + 1}º ${aluno.nome} - Média: ${aluno.media}`);
});
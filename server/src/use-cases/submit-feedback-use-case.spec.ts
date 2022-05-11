import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn(); //fn funcao espia, funcao q  tem funcionalidade nenhuma mas da pra saber se ela foi chamada ou n
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy }  //as dependencias estao mocadas, sao dependecias fakes aqui pq n vou testar dependencias
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async() => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,812dedjhedhbje',
    })).resolves.not.toThrow(); //que resolva, nao dispare erro

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async() => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,812dedjhedhbje',
    })).rejects.toThrow(); //espero que der ero
  });

  it('should not be able to submit feedback without comment', async() => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,812dedjhedhbje',
    })).rejects.toThrow(); //espero que der ero
  });

  it('should not be able to submit feedback with an invalid screenshot', async() => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'ta tudo bugado',
      screenshot: 'teste.jpg',
    })).rejects.toThrow(); //espero que der ero
  });
})
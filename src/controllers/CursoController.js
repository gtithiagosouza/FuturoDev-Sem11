const Curso = require('../models/Curso')

class CursoController {
    // construtor
    // metodos 
    // atributos


    async criarCurso(req, res) {
      try {
        
        const nome = req.body.nome
        const duracao_horas = req.body.duracao_horas

        if (!nome) {
            return res.status(400).json({ message: "O nome é obrigatório" })
        }

        if (!(duracao_horas >= 40 && duracao_horas <= 200)) {
            return res.status(400).json({
                message: "A duração do curso deve ser entre 40 e 200 horas"
            })
        }

        const curso = await Curso.create({
            nome: nome,
            duracao_horas: duracao_horas
        })

        res.status(201).json(curso)



      } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível cadastrar o curso' })
      }

    }

    async listaCurso(req, res) {
      try {
        let params = {}

        if (req.query.nome) {
           
            params = { ...params, nome: req.query.nome }
        }

        if (req.query.duracao_horas) {
            
            params = { ...params, duracao_horas: req.query.duracao_horas }
        }

        const cursos = await Curso.findAll({
            where: params
        })

        res.json(cursos)
      } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não possível listar todos os cursos' })
      }
    }

    async deletaCurso(req, res) {
        try {
           const { id } = req.params
        
            Curso.destroy({
                where: {
                    id: id
                }
            }) // DELETE cursos from cursos where id = 1
        
            res.status(204).json({})
         } catch (error) {
          console.log(error.message)
          res.status(500).json({ error: 'Não possível deletar o curso' })
   }
}

}




module.exports = new CursoController()
const KeywordService = require('../services/keywords.service');

class KeywordsController {
    keywordService = new KeywordService();

    /**레스토랑에 해당하는 키워드 모두 조회*/
    getKeyword = async (req, res) => {
        const { restaurant_id } = req.params;

        try {
            const { message, status, result } = await this.keywordService.findKeyword(restaurant_id);
            res.status(status).json({ message, result });
        } catch (error) {
            return res.status(500).json({ message: '키워드 조회에 실패하였습니다.' });
        }
    };

    /**키워드 생성*/
    createKeyword = async (req, res) => {
        const { restaurant_id } = req.params;
        const { keyword } = req.body;
        const { member_id } = req.session.user;
        try {
            const { message, status, result } = await this.keywordService.createKeyword(restaurant_id, member_id, keyword);
            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });

            return res.status(500).json({ message: '키워드를 추가하는데 실패했습니다.' });
        }
    };

    /**키워드 수정*/
    updateKeyword = async (req, res) => {
        console.log(1);
        const { restaurant_id, keyword_id } = req.params;
        const { keyword } = req.body;
        const { member_id } = req.session.user;

        try {
            const { message, status, result } = await this.keywordService.updateKeyword(keyword_id, restaurant_id, member_id, keyword);
            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });

            return res.status(500).json({ message: '키워드를 수정하는데 실패했습니다.' });
        }
    };

    /**키워드 삭제*/
    deleteKeyword = async (req, res) => {
        const { restaurant_id, keyword_id } = req.params;
        const { member_id } = req.session.user;

        try {
            const { message, status, result } = await this.keywordService.deleteKeyword(keyword_id, restaurant_id, member_id);
            res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });

            return res.status(500).json({ message: '키워드를 삭제하는데 실패했습니다.' });
        }
    };
}

module.exports = KeywordsController;

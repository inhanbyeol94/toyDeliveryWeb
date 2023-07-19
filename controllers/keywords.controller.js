const KeywordService = require('../services/keywords.service');

class KeywordsController {
    keywordService = new KeywordService();
    //

    getKeyword = async (req, res) => {
        const { restaurant_id } = req.params;

        try {
            const allKeyword = await this.keywordService.findKeyword(restaurant_id);

            res.status(200).json({ keywords: allKeyword });
        } catch (error) {
            return res.status(500).json({ errorMessage: '키워드 조회에 실패하였습니다.' });
        }
    };

    createKeyword = async (req, res) => {
        const { restaurant_id } = req.params;
        const { keyword } = req.body;
        const { member_id } = res.locals.member;

        try {
            await this.keywordService.createKeyword(restaurant_id, member_id, keyword);
            res.status(201).json({ message: '키워드를 추가하였습니다.' });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ errorMessage: error.message });

            return res.status(500).json({ errorMessage: '키워드를 추가하는데 실패했습니다.' });
        }
    };

    updateKeyword = async (req, res) => {
        const { restaurant_id, keyword_id } = req.params;
        const { keyword } = req.body;
        const { member_id } = res.locals.member;

        try {
            await this.keywordService.updateKeyword(keyword_id, restaurant_id, member_id, keyword);

            res.status(200).json({ message: '키워드 수정에 성공하였습니다.' });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ errorMessage: error.message });

            return res.status(500).json({ errorMessage: '키워드를 수정하는데 실패했습니다.' });
        }
    };

    deleteKeyword = async (req, res) => {
        const { restaurant_id, keyword_id } = req.params;
        const { member_id } = res.locals.member;

        try {
            await this.keywordService.deleteKeyword(keyword_id, restaurant_id, member_id);

            res.status(200).json({ message: '키워드 삭제에 성공하였습니다.' });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ errorMessage: error.message });

            return res.status(500).json({ errorMessage: '키워드를 삭제하는데 실패했습니다.' });
        }
    };
}

module.exports = KeywordsController;

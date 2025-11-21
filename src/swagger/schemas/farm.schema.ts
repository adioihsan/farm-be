/**
 * @swagger
 * components:
 *   schemas:
 *     Farm:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         farmName:
 *           type: string
 *         ownerName:
 *           type: string
 *         location:
 *           type: string
 *         isPartner:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateFarmRequest:
 *       type: object
 *       required:
 *         - farmName
 *         - ownerName
 *         - location
 *         - isPartner
 *       properties:
 *         farmName:
 *           type: string
 *         ownerName:
 *           type: string
 *         location:
 *           type: string
 *         isPartner:
 *           type: boolean
 *     UpdateFarmRequest:
 *       type: object
 *       properties:
 *         farmName:
 *           type: string
 *         ownerName:
 *           type: string
 *         location:
 *           type: string
 *         isPartner:
 *           type: boolean
 *     FarmListResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Farm'
 *     FarmDetailResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/SuccessResponse'
 *         - type: object
 *           properties:
 *             data:
 *               $ref: '#/components/schemas/Farm'
 */
export const _ = null;
import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })

        return res.status(201).json({
            message: "Company registered successfully!!!!!",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged un user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Find company by ID
        const company = await Company.findById(companyId);

        // Check if company exists
        if (!company) { // Fixed the typo from 'companies' to 'company'
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        // Send response with company data
        return res.status(200).json({
            company,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching company:", error);

        // Send error response
        return res.status(500).json({
            message: "Error fetching company",
            success: false,
        });
    }
};



export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file; // Assuming you're uploading a file

        // Cloudinary upload logic can be added here

        const updateData = { name, description, website, location };

        // Await the update operation
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        // Check if the company was found and updated
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated",
            success: true,
            company // You can also return the updated company info if needed
        });

    } catch (error) {
        console.error("Error updating company:", error);
        return res.status(500).json({
            message: "Error updating company",
            success: false
        });
    }
};

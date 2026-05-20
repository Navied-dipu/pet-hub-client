
const PetDetailsPage = async ({ params }) => {
    const { Id } = await params;
    console.log(Id)
    return (
        <div>
            {Id}
        </div>
    );
};

export default PetDetailsPage;
import Image from "next/image"

const HeroImage = () => {
    return (
        <>
            <div className="dark:hidden">
                <Image
                    src="https://ik.imagekit.io/xsmanrxwj/moynaa/hero-light.png?updatedAt=1733844683524"
                    width={500}
                    height={500}
                    alt="HeroLight"
                />
            </div>
            <div className="hidden dark:block">
                <Image
                    src="https://ik.imagekit.io/xsmanrxwj/moynaa/hero-dark.png?updatedAt=1733844746328"
                    width={500}
                    height={500}
                    alt="HeroLight"
                />
            </div>
        </>
    )
}

export default HeroImage